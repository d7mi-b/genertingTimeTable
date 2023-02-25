Drop database if exists timetable;

Create database timetable;

Use timetable;

Create table day (
    Day_ID int auto_increment not null,
    Day_Name varchar(30) not null,
    primary key(Day_ID)
);

Create table time (
    Time_ID int auto_increment not null,
    Start_Time varchar(50) not null,
    End_Time varchar(50) not null,
    Duration varchar(50) not null,
    primary key(Time_ID)
);

Create table user_type (
    User_Type_ID int auto_increment not null,
    User_Type_Name varchar(50) not null,
    primary key(User_Type_ID)
);
INSERT INTO user_type (User_Type_ID, User_Type_Name)
VALUES (1, 'ادمن'),
    (2, 'سكرتير'),
    (3, 'رئيس قسم');


Create table batch_type (
    Batch_Type_ID int auto_increment not null,
    Batch_Type varchar(50) not null,
    primary key(Batch_Type_ID)
);

Create table level (
    Level_ID int auto_increment not null,
    Level_Name varchar(50) not null,
    primary key(Level_ID)
);
INSERT INTO level (Level_ID, Level_Name)
VALUES (1, 'الأول'),
    (2, 'الثاني'),
    (3, 'الثالث'),
    (4, 'الرابع'),
    (5, 'الخامس');


Create table hall_type (
    Hall_Type_ID int auto_increment not null,
    Type_Name varchar(50) not null,
    primary key(Hall_Type_ID)
);

INSERT INTO hall_type (Hall_Type_ID, Type_Name)
VALUES (1, 'مختبر حاسوب'),
    (2, 'مختبر شبكات'),
    (3, 'قاعة محاضرات'),
    (4, 'مختبر فيزياء'),
    (5, 'مختبر كيمياء'),
    (6, 'مختبر إتصالات'),
    (7, 'مرسم'),
    (8, 'مختبر كهرباء'),
    (9, 'مختبر جيولوجيا'),
    (10, 'مختبر منطق رقمي'),
    (11, 'مختبر أنظمة تحكم');


Create table building (
    Building_ID int auto_increment not null,
    Building_Name varchar(50) not null UNIQUE,
    primary key(Building_ID)
);

INSERT INTO building (Building_ID, Building_Name)
VALUES (1, 'A'),
    (2, 'B'),
    (3, 'C'),
    (4, 'D');


Create table semester (
    Semester_ID int auto_increment not null,
    Semester_Name varchar(50) not null,
    primary key(Semester_ID)
);

INSERT INTO semester (
    Semester_ID,
    Semester_Name
)
    VALUES (1, 'الترم الأول'),
    (2,'الترم الثاني'),
    (3,'الترم الثالث'),
    (4,'الترم الرابع'),
    (5,'الترم الخامس'),
    (6,'الترم السادس'),
    (7,'الترم السابع'),
    (8,'الترم الثامن'),
    (9,'الترم التاسع'),
    (10,'الترم العاشر');

Create table college (
    College_ID int auto_increment not null,
    College_Name varchar(150) not null UNIQUE,
    primary key(College_ID)
);

INSERT INTO college(College_ID, College_Name)
VALUES (1, 'كلية الهندسة والبترول'),
    (2, 'كلية الطب');


Create table department (
    Department_ID int auto_increment not null,
    Department_Name varchar(150) not null UNIQUE,
    College_ID int,
    primary key(Department_ID),
    foreign key(College_ID) references college(College_ID)
);

INSERT INTO department(Department_ID, Department_Name, College_ID)
VALUES (1, 'هندسة حاسوب', 1),
    (2, 'هندسة الكترونية واتصالات', 1),
    (3, 'هندسة معمارية', 1),
    (4, 'هندسة مدنية', 1),
    (5, 'هندسة كيميائية', 1),
    (6, 'هندسة بترولية', 1),
    (7, 'العمادة', 1),
    (8, 'هندسة ميكانيكية', 1),
    (9, 'هندسة كهربائية', 1);


Create table users (
    User_ID int auto_increment not null,
    Name varchar(150) not null,
    User_Name varchar(150) not null UNIQUE,
    Password varchar(300) not null,
    Department_ID int,
    User_Type_ID int,
    primary key(User_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(User_Type_ID) references user_type(User_Type_ID)
);

INSERT INTO users(
        User_ID,
        Name,
        User_Name,
        Password,
        Department_ID,
        User_Type_ID
    )
VALUES (
        1,
        'عبدالرحمن',
        'admin',
        '$2b$10$tdLdfNHA3kDK5/3YoFtYGuK6z0PqiOvalMzqhYleAp1sHh1B84rqy',
        7,
        1
    ),
    (
        2,
        'هاله',
        'hlool24',
        '$2b$10$W/Pl1lHdwm8wVREa5KBE.OLzFecYFdICzEA.FY8y/pzDi2rE/N5Ty',
        1,
        3
    ),
    (
        3,
        'حسن',
        'realhassan97',
        '$2b$10$/8JfgqGcVKlKw0FvC4d32uaw39hCVfYalKjuatAvW9lAdZk.KIAaS',
        7,
        2
    ),
    (
        4,
        'نايف باكثير',
        'naife',
        '$2b$10$R/Liq3EyvVoiMfR8mwRsH.Gt441HSfyRdYA812VGWTQXLlhHHn/9i',
        7,
        2
    );


Create table batches (
    Batch_ID int auto_increment not null,
    College_ID int,
    Level_ID int,
    Department_ID int,
    Batch_General_Count int,
    Batch_Payment_Count int,
    Batch_Parallel_Count int,
    primary key(Batch_ID),
    foreign key(College_ID) references college(College_ID),
    foreign key(Level_ID) references level(Level_ID),
    foreign key(Department_ID) references department(Department_ID)
);

INSERT INTO batches(
        College_ID,
        Level_ID,
        Department_ID,
        Batch_General_Count,
        Batch_Payment_Count,
        Batch_Parallel_Count
    )
VALUES (1, 5, 1, 33, 4, 4),
    (1, 4, 1, 27, 7, 3),
    (1, 3, 4, 35, 11, 5),
    (1, 5, 2, 40, 9, 15),
    (1, 2, 3, 46, 9, 7),
    (1, 1, 5, 68, 9, 18),
    (1, 3, 6, 46, 7, 28),
    (1, 3, 1, 45, 4, 8),
    (1, 2, 1, 38, 12, 6),
    (1, 1, 1, 67, 8, 9);
    

Create table halls (
    Hall_ID int auto_increment not null,
    Hall_Name varchar(100) not null UNIQUE,
    Hall_Capacity int not null,
    Department_ID int,
    Building_ID int,
    Hall_Type_ID int,
    Is_Available Boolean NOT NULL,
    primary key(Hall_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(Building_ID) references building(Building_ID),
    foreign key(Hall_Type_ID) references hall_type(Hall_Type_ID)
);

INSERT INTO halls(
        Hall_Name,
        Hall_Capacity,
        Department_ID,
        Building_ID,
        Hall_Type_ID,
        Is_Available
    )
VALUES ('C101', 70, 7, 1, 3, 1),
    ('C1', 25, 1, 1, 1, 1),
    ('Network Lab', 25, 1, 1, 2, 1),
    ('C103', 50, 2, 1, 3, 1),
    ('A203', 40, 1, 1, 3, 1),
    ('مرسم 1', 60, 3, 1, 1, 1),
    ('مرسم 2', 60, 3, 2, 1, 0),
    ('Physic Lab', 35, 7, 1, 1, 1),
    ('D209', 55, 5, 1, 1, 1),
    ('C201', 64, 1, 1, 1, 1);


Create table subjects(
    Subject_ID int auto_increment not null,
    Subject_Name varchar(100) not null,
    Subject_Code varchar(50) not null,
    Department_ID int,
    College_ID int,
    Credit_Theoretical int,
    Credit_Practical int,
    Credit_Tutorial int,
    Semester_ID int,
    primary key(Subject_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(College_ID) references college(College_ID),
    foreign key(Semester_ID) references semester(Semester_ID)
    );

    INSERT INTO subjects (
     Subject_Name,
     Subject_Code,
     Credit_Theoretical,
     Credit_Practical,
     Credit_Tutorial,
     Department_ID,
     College_ID,
     Semester_ID) 
    VALUES
    ('Defferential Calculus', 'MATH111', 2, 0, 2, 1, 1, 1),
    ( 'General Physics I', 'PHYS111', 2, 2, 0, 1, 1, 1),
    ( 'General Chemistry I', 'CHEM111', 1, 2, 0, 1, 1, 1),
    ( 'Islamic Culture I', 'ISLAM111', 2, 0, 0, 1, 1, 1),
    ( 'English Language I', 'ENG111', 2, 0, 0, 1, 1, 1),
    ( 'Arabic Language I', 'ARAB111', 2, 0, 0, 1, 1, 1),
    ( 'Computer Skills', 'CSC117', 1, 2, 0, 1, 1, 1),
    ( 'Integral Calculus', 'MATH121', 2, 0, 2, 1, 1, 2),
    ( 'General Physics II', 'PHYS121', 2, 2, 0, 1, 1, 2),
    ( 'Introduction to Computer Engineering', 'COE122', 2, 0, 0, 1, 1, 2),
    ( 'Islamic Culture II', 'ISLAM121', 2, 0, 0, 1, 1, 2),
    ( 'English Language II', 'ENG121', 2, 0, 0, 1, 1, 2),
    ( 'Arabic Language II', 'ARAB121', 2, 0, 0, 1, 1, 2),
    ( 'Computer Programming', 'COE121', 2, 2, 0, 1, 1, 2);

    
    Create table lecturer(
    Lecturer_ID int auto_increment not null,
    Lecturer_Name varchar(100) not null,
    Department_ID int,
    College_ID int,
    Rank_ varchar(100),
    Not_Available boolean,
    NO_Available_Days int null,
    Sunday boolean ,
    Monday boolean ,
    Tuesday boolean ,
    Wednesday boolean ,
    Thursday boolean ,
    primary key(Lecturer_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(College_ID) references college(College_ID)
);


INSERT INTO lecturer (
        Lecturer_ID,
        Lecturer_Name,
        Department_ID,
        College_ID,
        Rank_,
        Not_Available,
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday
    )
VALUES (1, 'خالد فوزي اشبير', 1, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (2, 'رشا بن ثعلب', 1, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (3, 'سهام بامطرف', 1, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (4, 'مكارم بامطرف', 1, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (5, 'مازن باحشوان', 1, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (6, 'مجدي مرعي', 2, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (7, 'خالد بن سحاق', 2, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (8, 'هشام باكرمان', 2, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (9, 'وداد محمود فيصل', 2, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (10, 'سعيد بن عجاج', 2, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (11, 'فهد جوهر', 3, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (12, 'هشام البيتي', 3, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (13, 'عادل معلم بامعلم', 3, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (14, 'عامر بن مرضاح', 6, 1, 'doctor', 0, 0, 0, 0, 0, 0),
    (15, 'سالم بامومن', 6, 1, 'doctor', 0, 0, 0, 0, 0, 0);


CREATE TABLE lecturer_requsets (
    Request_ID int NOT NULL AUTO_INCREMENT,
    Sender_ID int DEFAULT NULL,
    Reciver_ID int DEFAULT NULL,
    Lecturer_ID int DEFAULT NULL,
    Subject_ID int DEFAULT NULL,
    Reply varchar(300) DEFAULT NULL,
    PRIMARY KEY (Request_ID),
    FOREIGN KEY (Sender_ID) REFERENCES users (User_ID),
    FOREIGN KEY (Reciver_ID) REFERENCES users (User_ID),
    FOREIGN KEY (Lecturer_ID) REFERENCES lecturer (Lecturer_ID),
    FOREIGN KEY (Subject_ID) REFERENCES subjects (Subject_ID)
);

Create table batch_groups(
    Group_ID int auto_increment not null,
    Group_ varchar(100) not null,
    Group_Count int not null,
    Batch_Type_ID int,
    primary key(Group_ID),
    foreign key(Batch_Type_ID) references batch_type(Batch_Type_ID)
);

Create table module(
    Module_ID int auto_increment not null,
    Semester_ID int,
    Subject_ID int,
    Lecturer_ID int,
    Department_ID int,
    Hall_Type_ID int DEFAULT NULL,
    primary key(Module_ID),
    foreign key(Semester_ID) references semester(Semester_ID),
    foreign key(Subject_ID) references subjects(Subject_ID),
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID),
    foreign key (Department_ID) references department(Department_ID),
    foreign key (Hall_Type_ID) references hall_type(Hall_Type_ID)
);
Create table E_T_T(
    ETT_ID int auto_increment not null,
    Module_ID int,
    Hall_ID int,
    Time_ID int,
    Day_ID int,
    Group_ID int,
    primary key(ETT_ID),
    foreign key(Module_ID) references module(Module_ID),
    foreign key(Hall_ID) references halls(Hall_ID),
    foreign key(Time_ID) references time(Time_ID),
    foreign key(Day_ID) references day(Day_ID),
    foreign key(Group_ID) references batch_groups(Group_ID)
);
