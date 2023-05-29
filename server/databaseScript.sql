Drop database if exists timetable;

Create database timetable;

Use timetable;

Create table day (
    Day_ID int auto_increment not null,
    Day_Name varchar(30) not null,
    primary key(Day_ID)
);

INSERT INTO day (Day_ID, Day_Name)
VALUES (1, 'الأحد'),
    (2, 'الإثنين'),
    (3, 'الثلاثاء'),
    (4, 'الأربعاء'),
    (5, 'الخميس');


Create table time (
    Time_ID int auto_increment not null,
    Start_Time time not null,
    End_Time time not null,
    Duration varchar(3) not null,
    primary key(Time_ID)
);

INSERT INTO time (Time_ID, Start_Time, End_Time, Duration)
VALUES (1, '08:00', '09:00', '1'),
    (2, '09:00', '10:00', '1'),
    (3, '10:00', '11:00', '1'),
    (4, '11:00', '12:00', '1'),
    (5, '12:00', '13:00', '1'),
    (6, '13:00', '14:00', '1'),
    (7, '14:00', '15:00', '1'),
    (8, '15:00', '16:00', '1');


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

INSERT INTO batch_type (Batch_Type_ID, Batch_Type)
VALUES (1, 'صباحي'),
    (2, "موازي"),
    (3, "نفقه خاصه");


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
INSERT INTO semester (Semester_ID, Semester_Name)
VALUES (1, 'المستوى الدراسي الأول'),
    (2, 'المستوى الدراسي الثاني'),
    (3, 'المستوى الدراسي الثالث'),
    (4, 'المستوى الدراسي الرابع'),
    (5, 'المستوى الدراسي الخامس'),
    (6, 'المستوى الدراسي السادس'),
    (7, 'المستوى الدراسي السابع'),
    (8, 'المستوى الدراسي الثامن'),
    (9, 'المستوى الدراسي التاسع'),
    (10, 'المستوى الدراسي العاشر');


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
    foreign key(College_ID) references college(College_ID) on DELETE CASCADE
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
    foreign key(Department_ID) references department(Department_ID) on DELETE set null,
    foreign key(User_Type_ID) references user_type(User_Type_ID) on DELETE set null
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
    Batch_NO int not null,
    Semester_ID int,
    Department_ID int,
    Batch_General_Count int,
    Batch_Payment_Count int,
    Batch_Parallel_Count int,
    primary key(Batch_ID),
    foreign key(Semester_ID) references semester(Semester_ID) on DELETE RESTRICT,
    foreign key(Department_ID) references department(Department_ID) on DELETE CASCADE
);

INSERT INTO batches(
        Batch_NO,
        Semester_ID,
        Department_ID,
        Batch_General_Count,
        Batch_Payment_Count,
        Batch_Parallel_Count
    )
VALUES (1, 1, 1, 50, 10, 3),
    (2, 3, 1, 50, 10, 3),
    (3, 5, 1, 45, 5, 5),
    (4, 7, 1, 40, 5, 3),
    (5, 9, 1, 30, 4, 2);


Create table halls (
    Hall_ID int auto_increment not null,
    Hall_Name varchar(100) not null UNIQUE,
    Hall_Capacity int not null,
    Department_ID int,
    Building_ID int,
    Hall_Type_ID int,
    Is_Available Boolean NOT NULL,
    primary key(Hall_ID),
    foreign key(Department_ID) references department(Department_ID) on DELETE set null,
    foreign key(Building_ID) references building(Building_ID) ON DELETE CASCADE,
    foreign key(Hall_Type_ID) references hall_type(Hall_Type_ID) on DELETE set null
);

INSERT INTO halls(
        Hall_Name,
        Hall_Capacity,
        Department_ID,
        Building_ID,
        Hall_Type_ID,
        Is_Available
    )
VALUES ('C1', '90', 1, 3, 1, 1),
    ('Network Lab', 90, 1, 3, 2, 1),
    ('A203', 55, 1, 1, 3, 1),
    ('Physic Lab', 90, 7, 1, 4, 1),
    ('C201', 63, 1, 3, 3, 1),
    ('A204', 63, 7, 1, 3, 1),
    ('D2', 90, 1, 4, 1, 1),
    ('Logic Design LAB', 90, 1, 3, 10, 1),
    ('C202', 55, 1, 3, 3, 1),
    ('D209', 65, 5, 4, 3, 1),
    ('B1', 90, 1, 2, 1, 1),
    ('B2', 90, 1, 2, 1, 1),
    ('c2', 90, 1, 3, 1, 1),
    ('PLC LAB', 90, 2, 3, 11, 1),
    ('Electronic Circuits LAB', 90, 2, 3, 8, 1),
    ('Chemistry Lab', 90, 5, 4, 5, 1),
    ('Principle of Communication Lab', 90, 2, 3, 6, 1);


Create table subjects(
    Subject_ID int auto_increment not null,
    Subject_Name varchar(100) not null,
    Subject_Code varchar(50) not null,
    Department_ID int,
    Credit_Theoretical int,
    Credit_Practical int,
    Credit_Tutorial int,
    Semester_ID int,
    primary key(Subject_ID),
    foreign key(Department_ID) references department(Department_ID) on DELETE CASCADE,
    foreign key(Semester_ID) references semester(Semester_ID) on DELETE RESTRICT
);

INSERT INTO subjects (
        Subject_ID,
        Subject_Name,
        Subject_Code,
        Credit_Theoretical,
        Credit_Practical,
        Credit_Tutorial,
        Department_ID,
        Semester_ID
    )
VALUES (1, 'Defferential Calculus', 'MATH111', 2, 0, 2, 1, 1),
    (2, 'General Physics I', 'PHYS111', 2, 2, 0, 1, 1),
    (3, 'General Chemistry I', 'CHEM111', 2, 2, 0, 1, 1),
    (4, 'Islamic Culture I', 'ISLAM111', 2, 0, 0, 1, 1),
    (5, 'English Language I', 'ENG111', 2, 0, 0, 1, 1),
    (6, 'Arabic Language I', 'ARAB111', 2, 0, 0, 1, 1),
    (7, 'Computer Skills', 'CSC117', 1, 2, 0, 1, 1),
    (8, 'Integral Calculus', 'MATH121', 2, 0, 2, 1, 2),
    (9, 'General Physics II', 'PHYS121', 2, 2, 0, 1, 2),
    (10, 'Introduction to Computer Engineering', 'COE122', 2, 0, 0, 1, 2),
    (11, 'Islamic Culture II', 'ISLAM121', 2, 0, 0, 1, 2),
    (12, 'English Language II', 'ENG121', 2, 0, 0, 1, 2),
    (13, 'Arabic Language II', 'ARAB121', 2, 0, 0, 1, 2),
    (14, 'Computer Programming', 'COE121', 2, 2, 1, 1, 2),
    (15, 'Vectors and Matrics', 'MATH211', 2, 0, 2, 1, 3),
    (16, 'Data Structure', 'CSC217', 2, 2, 0, 1, 3),
    (17, 'English Language 3', 'ENG212', 2, 0, 0, 1, 3),
    (18, 'Object Oriented Programming', 'CSC212', 2, 2, 0, 1, 3),
    (19, 'Discrete Structure', 'SCS215', 3, 0, 0, 1, 3),
    (20, 'Electircal Circuits', 'COE211', 3, 2, 0, 1, 3),
    (21, 'Differential Equations', 'MATH221', 2, 0, 2, 1, 4),
    (22, 'Technical Writing', 'ENG211', 2, 0, 0, 1, 4),
    (23, 'Signals and Systems', 'ECE313',3, 0, 0, 1, 4),
    (24, 'Digital Logic Design', 'COE221', 3, 2, 0, 1, 4),
    (25, 'Electronic Devices', 'ECE222', 2, 2, 0, 1, 4),
    (26, 'User Interface Development', 'COE222', 2, 2, 0, 1, 4),
    (27, 'Engineering Probability and Statistics', 'MATH311', 2, 0, 2, 1, 5),
    (28, 'Electronic Circuits', 'ECE312', 2, 2, 0, 1, 5),
    (29, 'Introduction to Database', 'IT225', 2, 2, 0, 1, 5),
    (30, 'Principles of Communication Systems', 'COE311', 2, 2, 0, 1, 5),
    (31, 'Control System', 'COE312', 2, 2, 0, 1, 5),
    (32, 'Computer Organization', 'COE313', 2, 2, 0, 1, 5),
    (33, 'Communication Skills', 'COM221', 2, 0, 0, 1, 6),
    (34, 'Numerical Methods', 'MATH321', 2, 0, 2, 1, 6),
    (35, 'Digital Electornics', 'ECE321', 2, 2, 0, 1, 6),
    (36, 'Software Engineering', 'CSC317', 2, 2, 0, 1, 6),
    (37, 'Computer Archtrcture', 'COE321', 2, 2, 0, 1, 6),
    (38, 'Microprocessors Systems', 'COE322', 2, 2, 0, 1, 6),
    (39, 'Scientific Research Methodology', 'SRM411', 2, 0, 0, 1, 7),
    (40, 'Digital Signal Processing', 'ECE416', 3, 0, 0, 1, 7),
    (41, 'Artificial Intelligence', 'CSC313', 2, 2, 0, 1, 7),
    (42, 'Computer Network I', 'COE411', 2, 2, 0, 1, 7),
    (43, 'Microprocessor Interfacing', 'COE412', 2, 2, 0, 1, 7),
    (44, 'Operating System', 'CSC226', 2, 2, 0, 1, 7),
    (45, 'Professional Ethics', 'IT311', 2, 0, 0, 1, 8),
    (46, 'Computer Network II', 'COE421', 2, 2, 0, 1, 8),
    (47, 'Real Time Systems', 'COE422', 2, 2, 0, 1, 8),
    (48, 'Cryptography and Network Security', 'COE423', 2, 2, 0, 1, 8),
    (49, 'Field Training', 'COE424', 0, 0, 0, 1, 8),
    (50, 'Business and Entrepreneurship', 'COE425', 2, 2, 0, 1, 8),
    (51, 'Elective Course 1', 'COE4XX', 2, 2, 0, 1, 8),
    (52, 'Hardware Design Lang & Modeling VHDL', 'CE511', 2, 2, 0, 1, 9),
    (53, 'Computer & Internet Security', 'CE512', 2, 2, 0, 1, 9),
    (54, 'Elective Course 1', 'CE513', 2, 2, 0, 1, 9),
    (55, 'Parallel Processing Techniques', 'CE522', 3, 0, 0, 1, 10),
    (56, 'Elective Course 2', 'CE522', 2, 2, 0, 1, 10);


Create table subject_type (
    Subject_Type_ID int primary key auto_increment not null,
    Subject_Type_Name varchar(100) not null
);

INSERT INTO subject_type (Subject_Type_ID, Subject_Type_Name)
VALUES (1, 'نظري'),
    (2, 'عملي'),
    (3, 'تمارين');


Create table lecturer (
    Lecturer_ID int auto_increment not null,
    Lecturer_Name varchar(100) not null,
    Department_ID int,
    Rank_ varchar(100),
    Not_Available boolean,
    NO_Available_Days int null,
    Sunday boolean,
    Monday boolean,
    Tuesday boolean,
    Wednesday boolean,
    Thursday boolean,
    primary key(Lecturer_ID),
    foreign key(Department_ID) references department(Department_ID) on DELETE SET NULL
);

INSERT INTO lecturer (
        Lecturer_ID,
        Lecturer_Name,
        Department_ID,
        Rank_,
        Not_Available,
        NO_Available_Days,
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday
    )
VALUES (1, 'خالد فوزي اشبير', 1, 'doctor', 0, 3, 1, 0, 1, 1, 0),
    (2, 'رشا بن ثعلب', 1, 'doctor', 0, 1, 0, 1, 0, 1, 0),
    (3, 'سهام بامطرف', 1, 'doctor', 0, 1, 0, 1, 0, 1, 0),
    (4, 'مكارم بامطرف', 1, 'doctor', 0, 2, 1, 1, 0, 1, 0),
    (5, 'مازن باحشوان', 1, 'doctor', 0, 1, 1, 0, 0, 0, 0),
    (6, 'مجدي مرعي', 2, 'doctor', 0, 2, 1, 1, 0, 1, 0),
    (7, 'خالد بن سحاق', 2, 'doctor', 0, 1, 1, 1, 0, 0, 0),
    (8, 'هشام باكرمان', 2, 'doctor', 0, 2, 1, 1, 0, 0, 0),
    (9, 'وداد محمود فيصل', 2, 'doctor', 0, 3, 1, 0, 1, 1, 0),
    (10, 'سعيد بن عجاج', 2, 'doctor', 0, 2, 0, 0, 0, 0, 0),
    (11, 'فهد جوهر', 3, 'doctor', 0, 3, 0, 0, 0, 0, 0),
    (12, 'هشام البيتي', 3, 'doctor', 0, 3, 0, 0, 0, 0, 0),
    (13, 'عادل معلم بامعلم', 3, 'doctor', 0, 3, 0, 0, 0, 0, 0),
    (14,'عامر بن مرضاح', 6, 'doctor', 0, 2, 0, 0, 0, 0, 0),
    (15, 'سالم بامومن', 6, 'doctor', 0, 3, 0, 0, 0, 0, 0),
    (16, 'عزت السعدي', 1, 'doctor', 0, 1, 1, 0, 0, 0, 0 ),
    (17, 'فاطمة بابقي', 7, '', 1, 4, 1, 1, 1, 0, 1),
    (18, 'أمين', 7, '', 0, 2, 1, 1, 1, 0, 0),
    (19, 'إيمان', 7, '', 0, 2, 0, 1, 1, 1, 0),
    (20, 'نايف بن همام', 7, '', 0, 2, 0, 1, 1, 1, 1),
    (21, 'ناصر الغيثي', 1, '', 0, 3, 1, 0, 1, 1, 1),
    (22, 'صالح بارفعه', 7, '', 0, 3, 1, 1, 1, 1, 0),
    (23, 'عمرو عبدالرب', 7, '', 0, 2, 1, 1, 0, 1, 1),
    (24, 'خالد بازهير', 7, '', 0, 3, 1, 1, 1, 0, 0),
    (25, 'وضاح السبتي', 1, '', 0, 1, 0, 1, 0, 1, 0),
    (26, 'خالد بن صديق', 2, '', 0, 3, 1, 1, 1, 1, 1),
    (27, 'محمد بافقيه', 7, '', 0, 3, 1, 1, 0, 1, 0),
    (28, 'وفاء ادريس', 1, '', 0, 3, 0, 1, 1, 1, 1),
    (29, 'عصمت', 1, '', 0, 3, 1, 1, 1, 0, 1),
    (30, 'عبدالله باحسن', 2, 'doctor', 0, 3, 1, 1, 1, 0, 0),
    (31, 'امل بن عيدان', 2, '', 0, 3, 0, 0, 1, 1, 1),
    (32, 'فاطمة بافرج', 1, '', 0, 3, 1, 0, 1, 1, 1),
    (33, 'علاء باسواقي', 2, '', 0, 2, 0, 1, 0, 0, 1),
    (34, 'صفاء جوهر', 1, '', 0, 3, 1, 1, 1, 1, 0),
    (35, 'سامية بن محرم', 7, 'techer', 0, 3, 1, 1, 1, 1, 1),
    (36, 'حسن القثمي', 7, 'techer', 0, 3, 0, 0, 1, 0, 1);


CREATE TABLE lecturer_requsets (
    Request_ID int NOT NULL AUTO_INCREMENT,
    Sender_ID int DEFAULT NULL,
    Reciver_ID int DEFAULT NULL,
    Lecturer_ID int DEFAULT NULL,
    Subject_ID int DEFAULT NULL,
    Subject_Type_ID int DEFAULT null,
    Reply varchar(300) DEFAULT NULL,
    PRIMARY KEY (Request_ID),
    FOREIGN KEY (Sender_ID) REFERENCES department (Department_ID) ON DELETE SET NULL,
    FOREIGN KEY (Reciver_ID) REFERENCES department (Department_ID) ON DELETE SET NULL,
    FOREIGN KEY (Lecturer_ID) REFERENCES lecturer (Lecturer_ID) ON DELETE SET NULL,
    FOREIGN KEY (Subject_ID) REFERENCES subjects (Subject_ID) ON DELETE SET NULL,
    FOREIGN KEY (Subject_Type_ID) REFERENCES subject_type (Subject_Type_ID) ON DELETE SET NULL
);

Create table batch_groups(
    Group_ID int auto_increment not null,
    Group_ varchar(100) not null,
    Group_Count int not null,
    Batch_ID int,
    Batch_Type_ID int,
    primary key(Group_ID),
    foreign key(Batch_ID) references batches(Batch_ID) ON DELETE CASCADE,
    foreign key(Batch_Type_ID) references batch_type(Batch_Type_ID) ON DELETE SET DEFAULT
);

INSERT INTO batch_groups(
        Group_ID,
        Group_,
        Group_Count,
        Batch_ID,
        Batch_Type_ID
    )
VALUES (1, 'A', 63, 1, 1),
    (2, 'A', 63, 2, 1),
    (3, 'A', 55, 3, 1),
    (4, 'A', 48, 4, 1),
    (5, 'A', 36, 5, 1);


Create table module(
    Module_ID int auto_increment not null,
    Semester_ID int,
    Subject_ID int,
    Lecturer_ID int,
    Department_ID int,
    Hall_Type_ID int DEFAULT NULL,
    Subject_Type_ID int,
    primary key(Module_ID),
    foreign key(Semester_ID) references semester(Semester_ID) ON DELETE RESTRICT,
    foreign key(Subject_ID) references subjects(Subject_ID) ON DELETE CASCADE,
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID) ON DELETE SET NULL,
    foreign key (Department_ID) references department(Department_ID) ON DELETE CASCADE,
    foreign key (Hall_Type_ID) references hall_type(Hall_Type_ID) ON DELETE SET NULL,
    FOREIGN KEY (Subject_Type_ID) REFERENCES subject_type (Subject_Type_ID) ON DELETE SET NULL
);

INSERT INTO module (
        Module_ID,
        Semester_ID,
        Subject_ID,
        Lecturer_ID,
        Department_ID,
        Hall_Type_ID,
        Subject_Type_ID
    )
VALUES (1, 1, 1, 17, 1, 3, 1),
    (2, 1, 2, 19, 1, 3, 1),
    (3, 1, 3, 35, 1, 3, 1),
    (4, 1, 4, 23, 1, 3, 1),
    (5, 1, 5, 20, 1, 3, 1),
    (6, 1, 6, 18, 1, 3, 1),
    (7, 1, 7, 21, 1, 3, 3),
    (8, 1, 1, 17, 1, 3, 3),
    (9, 1, 2, 22, 1, 4, 2),
    (10, 1, 3, 22, 1, 5, 2),
    (11, 1, 7, 21, 1, 1, 2),
    (12, 3, 16, 3, 1, 3, 1),
    (13, 3, 20, 1, 1, 3, 1),
    (14, 3, 20, 21, 1, 3, 2),
    (15, 3, 18, 25, 1, 3, 2),
    (16, 3, 16, 34, 1, 3, 2),
    (17, 3, 15, 24, 1, 3, 1),
    (18, 3, 15, 24, 1, 3, 2),
    (19, 3, 19, 17, 1, 3, 1),
    (20, 3, 18, 16, 1, 3, 1),
    (21, 3, 17, 20, 1, 3, 1),
    (22, 5, 28, 8, 1, 3, 1),
    (23, 5, 32, 5, 1, 3, 1),
    (24, 5, 29, 2, 1, 3, 1),
    (25, 5, 31, 1, 1, 3, 1),
    (26, 5, 32, 34, 1, 10, 2),
    (27, 5, 31, 28, 1, 11, 2),
    (28, 5, 30, 7, 1, 3, 1),
    (29, 5, 27, 36, 1, 3, 1),
    (30, 5, 29, 29, 1, 1, 2),
    (31, 5, 30, 31, 1, 6, 2),
    (32,  5, 27, 36, 1, 3, 3),
    (33, 7, 43, 5, 1, 3, 1),
    (34, 7, 41, 2, 1, 3, 1),
    (35, 7, 39, 25, 1, 3, 1),
    (36, 7, 42, 32, 1, 1, 2),
    (37, 7, 43, 29, 1, 1, 2),
    (38, 7, 41, 34, 1, 1, 2),
    (39, 7, 40, 1, 1, 3, 1),
    (40, 7, 44, 25, 1, 3, 1),
    (41, 7, 44, 25, 1, 1, 2),
    (42, 7, 42, 4, 1, 3, 1),
    (43, 9, 52, 1, 1, 3, 1),
    (44, 9, 53, 4, 1, 3, 1),
    (45, 9, 54, 16, 1, 3, 1),
    (46, 9, 52, 21, 1, 1, 2),
    (47, 9, 53, 32, 1, 1, 2),
    (48, 9, 54, 21, 1, 1, 2);


Create table E_T_T(
    ETT_ID int auto_increment not null,
    Module_ID int,
    Lecturer_ID int,
    Group_ID int,
    Hall_ID int,
    Day_ID int,
    Start_Time time,
    End_Time time,
    primary key(ETT_ID),
    foreign key(Module_ID) references module(Module_ID) ON DELETE CASCADE,
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID) ON DELETE SET NULL,
    foreign key(Hall_ID) references halls(Hall_ID) ON DELETE SET NULL,
    foreign key(Day_ID) references day(Day_ID) ON DELETE SET NULL,
    foreign key(Group_ID) references batch_groups(Group_ID) ON DELETE CASCADE
);


Create table system_state (
    System_State_ID int primary key AUTO_INCREMENT NOT NULL,
    System_Name varchar(300) not null,
    System_Year varchar(100) not null,
    System_Semester int not null,
    check (System_Semester in (1, 2))
);

INSERT INTO system_state (
        System_State_ID,
        System_Name,
        System_Semester,
        System_Year
    )
VALUES (1, "جامعة حضرموت", 1, '2023/2024');

Create table fitnes_weight (
    Weight_ID int primary key auto_increment,
    Weight_Name varchar(300) not null,
    Weight int not null
);

INSERT INTO fitnes_weight (Weight_Name, Weight)
VALUES ('Lecturer availabilty', 2000),
    ('Time gap', 100),
    ('Labs on same day', 1000),
    ('Day off', 100),
    ('Lectures on day', 1000),
    ('Groups times', '1000');