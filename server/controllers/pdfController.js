const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const db = require('../DB');

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth() + 1;
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

function renderTemplate(data, templateName) {
    const html = fs.readFileSync(path.join(process.cwd(), '/controllers/templates', `${templateName}.hbs`), {
        encoding: "utf-8",
    });

    const template = hbs.compile(html);

    const rendered = template(data);
    return rendered;
}

async function createPdf(outputPath, htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.emulateMediaType("print");
    const pdf = await page.pdf({format: "A3"});

    await browser.close();

    return pdf;
}

module.exports.getScheduels =  async (req, res) => {
    
    let { Level, Department_Name, year, semester, Department_ID } = req.query
    
    const [ schedules ] = await db.query(`
        SELECT ETT_ID, module.Module_ID, Subject_Name, Lecturer_Name, module.Semester_ID, Group_, Hall_Name, day.Day_ID, Day_Name, Start_Time, End_Time, module.Department_ID, 
        Department_Name, module.Department_ID FROM e_t_t
        join module on e_t_t.Module_ID = module.Module_ID
        join subjects on module.Subject_ID = subjects.Subject_ID
        join lecturer on lecturer.Lecturer_ID = e_t_t.Lecturer_ID
        join batch_groups on e_t_t.Group_ID = batch_groups.Group_ID
        join batches on batch_groups.Batch_ID = batches.Batch_ID
        join halls on e_t_t.Hall_ID = halls.Hall_ID
        join day on e_t_t.Day_ID = day.Day_ID
        join department on department.Department_ID = ?
        `,[Department_ID])

    
    if(semester == 1) semester = "الأول"
    else semester = "الثاني"
    
    const scheduel1_sun = schedules.filter(t => t.Day_ID == 1 && t.Semester_ID == Level )
    const scheduel2_mun = schedules.filter(t => t.Day_ID == 2 && t.Semester_ID == Level )
    const scheduel3_tue = schedules.filter(t => t.Day_ID == 3 && t.Semester_ID == Level )
    const scheduel4_wed = schedules.filter(t => t.Day_ID == 4 && t.Semester_ID == Level )
    const scheduel5_thu = schedules.filter(t => t.Day_ID == 5 && t.Semester_ID == Level )

    let title;
    
    if(Level == 1 || Level == 2 ) title = 'جدول مستوى أول';
    else if(Level == 3 || Level == 4) title = 'جدول مستوى ثاني';
    else if(Level == 5 || Level == 6) title = 'جدول مستوى ثالث';
    else if(Level == 7 || Level == 8) title = 'جدول مستوى رابع';
    else title = 'جدول مستوى خامس';
    

    const data = {
        title,
        Department_Name,
        scheduel_1:scheduel1_sun,
        scheduel_2:scheduel2_mun,
        scheduel_3:scheduel3_tue,
        scheduel_4:scheduel4_wed,
        scheduel_5:scheduel5_thu,
        date: getDate(new Date()),
        year,
        semester
    };

    const htmlContent = renderTemplate(data, '/schedules');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent)
        .then(pdf => {
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
            res.send(pdf)
        })

};