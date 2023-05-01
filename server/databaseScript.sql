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
    Batch_NO int not null,
    College_ID int,
    Semester_ID int,
    Department_ID int,
    Batch_General_Count int,
    Batch_Payment_Count int,
    Batch_Parallel_Count int,
    primary key(Batch_ID),
    foreign key(College_ID) references college(College_ID),
    foreign key(Semester_ID) references semester(Semester_ID),
    foreign key(Department_ID) references department(Department_ID)
);
INSERT INTO batches(
        Batch_NO,
        College_ID,
        Semester_ID,
        Department_ID,
        Batch_General_Count,
        Batch_Payment_Count,
        Batch_Parallel_Count
    )
VALUES (1, 1, 10, 1, 33, 4, 4),
    (2, 1, 8, 1, 27, 7, 3),
    (1, 1, 6, 4, 35, 11, 5),
    (4, 1, 10, 2, 40, 9, 15),
    (7, 1, 4, 3, 46, 9, 7),
    (7, 1, 2, 5, 68, 9, 18),
    (3, 1, 6, 6, 46, 7, 28),
    (3, 1, 6, 1, 45, 4, 8),
    (4, 1, 4, 1, 38, 12, 6),
    (5, 1, 2, 1, 67, 8, 9);
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
VALUES ('C101', 100, 7, 3, 3, 1),
    ('C1', '90', 1, 3, 1, 1),
    ('Network Lab', 90, 1, 3, 2, 1),
    ('C103', 50, 2, 3, 3, 1),
    ('A203', 40, 1, 1, 3, 1),
    ('مرسم 1', 90, 3, 2, 7, 1),
    ('مرسم 2', 90, 3, 2, 7, 1),
    ('Physic Lab', 90, 7, 1, 4, 1),
    ('D209', 55, 5, 4, 3, 1),
    ('C201', 60, 1, 3, 3, 1),
    ('A204', 60, 6, 1, 3, 1),
    ('D2', 90, 1, 4, 1, 1),
    ('Logic Design LAB', 90, 1, 3, 10, 1),
    ('C202', 40, 1, 3, 3, 1),
    ('B1', 90, 1, 2, 1, 1),
    ('B2', 90, 1, 2, 1, 1),
    ('c2', 90, 1, 3, 1, 1),
    ('PLC LAB', 90, 2, 3, 11, 1),
    ('Electrical LAB', 90, 2, 3, 8, 1);
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
        Subject_ID,
        Subject_Name,
        Subject_Code,
        Credit_Theoretical,
        Credit_Practical,
        Credit_Tutorial,
        Department_ID,
        College_ID,
        Semester_ID
    )
VALUES (
        1,
        'Defferential Calculus',
        'MATH111',
        2,
        0,
        2,
        1,
        1,
        1
    ),
    (
        2,
        'General Physics I',
        'PHYS111',
        2,
        2,
        0,
        1,
        1,
        1
    ),
    (
        3,
        'General Chemistry I',
        'CHEM111',
        1,
        2,
        0,
        1,
        1,
        1
    ),
    (
        4,
        'Islamic Culture I',
        'ISLAM111',
        2,
        0,
        0,
        1,
        1,
        1
    ),
    (
        5,
        'English Language I',
        'ENG111',
        2,
        0,
        0,
        1,
        1,
        1
    ),
    (
        6,
        'Arabic Language I',
        'ARAB111',
        2,
        0,
        0,
        1,
        1,
        1
    ),
    (7, 'Computer Skills', 'CSC117', 1, 2, 0, 1, 1, 1),
    (
        8,
        'Integral Calculus',
        'MATH121',
        2,
        0,
        2,
        1,
        1,
        2
    ),
    (
        9,
        'General Physics II',
        'PHYS121',
        2,
        2,
        0,
        1,
        1,
        2
    ),
    (
        10,
        'Introduction to Computer Engineering',
        'COE122',
        2,
        0,
        0,
        1,
        1,
        2
    ),
    (
        11,
        'Islamic Culture II',
        'ISLAM121',
        2,
        0,
        0,
        1,
        1,
        2
    ),
    (
        12,
        'English Language II',
        'ENG121',
        2,
        0,
        0,
        1,
        1,
        2
    ),
    (
        13,
        'Arabic Language II',
        'ARAB121',
        2,
        0,
        0,
        1,
        1,
        2
    ),
    (
        14,
        'Computer Programming',
        'COE121',
        2,
        2,
        1,
        1,
        1,
        2
    ),
    (
        15,
        'Electronic Devices',
        'ED111',
        2,
        2,
        0,
        1,
        1,
        4
    ),
    (
        16,
        'Digital Logic Design',
        'DLD121',
        3,
        2,
        0,
        1,
        1,
        4
    ),
    (
        17,
        'Signals and Systems',
        'SYS11',
        3,
        2,
        0,
        1,
        1,
        4
    ),
    (
        18,
        'Technical Writing',
        'TWENG',
        2,
        0,
        0,
        1,
        1,
        4
    ),
    (
        19,
        'Differential Equations',
        'DIFEQ',
        2,
        0,
        2,
        1,
        1,
        4
    ),
    (
        20,
        'User Interface Development',
        'UID',
        2,
        2,
        0,
        1,
        1,
        4
    ),
    (21, 'Microprocessor', 'MPU11', 2, 2, 0, 1, 1, 6),
    (
        22,
        'Numerical Method',
        'NM121',
        4,
        0,
        0,
        1,
        1,
        6
    ),
    (
        23,
        'Computer Archtrcture',
        'COARC121',
        2,
        2,
        0,
        1,
        1,
        6
    ),
    (
        24,
        'Digital Electornics',
        'DELE131',
        2,
        2,
        0,
        1,
        1,
        6
    ),
    (
        25,
        'Software Engineering',
        'SWENG',
        2,
        2,
        0,
        1,
        1,
        6
    ),
    (
        26,
        'Communication Skills',
        'COSKL11',
        2,
        0,
        0,
        1,
        1,
        6
    ),
    (
        27,
        'Computer Network II',
        'CN131',
        3,
        2,
        0,
        1,
        1,
        8
    ),
    (
        28,
        'Artificial Intelligence',
        'CSAI',
        2,
        2,
        0,
        1,
        1,
        8
    ),
    (
        29,
        'VLSI Cicuite Design',
        'CEVLSI',
        2,
        2,
        0,
        1,
        1,
        8
    ),
    (30, 'Data Security', 'CSDSEC', 2, 2, 0, 1, 1, 8),
    (
        31,
        'Real-Time Computer Control & PLC',
        'ECEPLC',
        2,
        2,
        0,
        1,
        1,
        8
    ),
    (
        32,
        'Parrallel Processing Techniques',
        'CEPPT',
        2,
        0,
        0,
        1,
        1,
        10
    ),
    (33, 'Neural Network', 'CSNN', 2, 2, 0, 1, 1, 10);
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
    College_ID int,
    Rank_ varchar(100),
    Not_Available boolean,
    NO_Available_Days int null,
    Sunday boolean,
    Monday boolean,
    Tuesday boolean,
    Wednesday boolean,
    Thursday boolean,
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
        NO_Available_Days,
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday
    )
VALUES (
        1,
        'خالد فوزي اشبير',
        1,
        1,
        'doctor',
        0,
        3,
        1,
        0,
        1,
        1,
        0
    ),
    (
        2,
        'رشا بن ثعلب',
        1,
        1,
        'doctor',
        0,
        1,
        0,
        1,
        0,
        1,
        0
    ),
    (
        3,
        'سهام بامطرف',
        1,
        1,
        'doctor',
        0,
        1,
        0,
        1,
        0,
        0,
        0
    ),
    (
        4,
        'مكارم بامطرف',
        1,
        1,
        'doctor',
        0,
        2,
        0,
        1,
        0,
        1,
        0
    ),
    (
        5,
        'مازن باحشوان',
        1,
        1,
        'doctor',
        0,
        1,
        1,
        0,
        0,
        0,
        0
    ),
    (6, 'مجدي مرعي', 2, 1, 'doctor', 0, 2, 0, 1, 0, 0, 0),
    (
        7,
        'خالد بن سحاق',
        2,
        1,
        'doctor',
        0,
        1,
        0,
        0,
        0,
        0,
        0
    ),
    (
        8,
        'هشام باكرمان',
        2,
        1,
        'doctor',
        0,
        2,
        0,
        0,
        0,
        0,
        0
    ),
    (
        9,
        'وداد محمود فيصل',
        2,
        1,
        'doctor',
        0,
        3,
        1,
        0,
        0,
        0,
        0
    ),
    (
        10,
        'سعيد بن عجاج',
        2,
        1,
        'doctor',
        0,
        2,
        0,
        0,
        0,
        0,
        0
    ),
    (11, 'فهد جوهر', 3, 1, 'doctor', 0, 3, 0, 0, 0, 0, 0),
    (
        12,
        'هشام البيتي',
        3,
        1,
        'doctor',
        0,
        3,
        0,
        0,
        0,
        0,
        0
    ),
    (
        13,
        'عادل معلم بامعلم',
        3,
        1,
        'doctor',
        0,
        3,
        0,
        0,
        0,
        0,
        0
    ),
    (
        14,
        'عامر بن مرضاح',
        6,
        1,
        'doctor',
        0,
        2,
        0,
        0,
        0,
        0,
        0
    ),
    (
        15,
        'سالم بامومن',
        6,
        1,
        'doctor',
        0,
        3,
        0,
        0,
        0,
        0,
        0
    ),
    (
        16,
        'عزت السعدي',
        1,
        1,
        'doctor',
        0,
        1,
        1,
        0,
        0,
        0,
        0
    ),
    (17, 'فاطمة بابقي', 7, 1, '', 1, 4, 1, 0, 0, 0, 1),
    (18, 'أمين', 7, 1, '', 0, 2, 1, 0, 0, 0, 0),
    (19, 'إيمان', 7, 1, '', 0, 2, 0, 1, 0, 1, 0),
    (20, 'نايف بن همام', 7, 1, '', 0, 2, 0, 1, 0, 0, 0),
    (21, 'ناصر الغيثي', 1, 1, '', 0, 3, 0, 0, 1, 0, 1),
    (22, 'صالح بارفعه', 7, 1, '', 0, 3, 0, 0, 1, 0, 0),
    (23, 'عمرو عبدالرب', 7, 1, '', 0, 2, 0, 0, 0, 0, 1),
    (24, 'خالد بازهير', 7, 1, '', 0, 3, 0, 0, 1, 0, 0),
    (25, 'وضاح السبتي', 1, 1, '', 0, 1, 0, 0, 0, 1, 0),
    (26, 'خالد بن صديق', 2, 1, '', 0, 3, 0, 0, 0, 0, 1),
    (27, 'محمد بافقيه', 7, 1, '', 0, 3, 1, 0, 0, 0, 0),
    (28, 'وفاء ادريس', 1, 1, '', 0, 3, 0, 1, 1, 0, 0),
    (29, 'عصمت', 1, 1, '', 0, 3, 1, 1, 0, 0, 1),
    (
        30,
        'عبدالله باحسن',
        2,
        1,
        'doctor',
        0,
        3,
        0,
        0,
        1,
        0,
        0
    ),
    (31, 'امل بن عيدان', 2, 1, '', 0, 3, 0, 0, 0, 0, 1),
    (32, 'فاطمة بافرج', 1, 1, '', 0, 3, 1, 0, 1, 0, 0),
    (33, 'علاء باسواقي', 2, 1, '', 0, 2, 0, 0, 0, 0, 1),
    (34, 'صفاء جوهر', 1, 1, '', 0, 3, 0, 0, 1, 0, 0);
CREATE TABLE lecturer_requsets (
    Request_ID int NOT NULL AUTO_INCREMENT,
    Sender_ID int DEFAULT NULL,
    Reciver_ID int DEFAULT NULL,
    Lecturer_ID int DEFAULT NULL,
    Subject_ID int DEFAULT NULL,
    Subject_Type_ID int DEFAULT null,
    Reply varchar(300) DEFAULT NULL,
    PRIMARY KEY (Request_ID),
    FOREIGN KEY (Sender_ID) REFERENCES department (Department_ID),
    FOREIGN KEY (Reciver_ID) REFERENCES department (Department_ID),
    FOREIGN KEY (Lecturer_ID) REFERENCES lecturer (Lecturer_ID),
    FOREIGN KEY (Subject_ID) REFERENCES subjects (Subject_ID),
    FOREIGN KEY (Subject_Type_ID) REFERENCES subject_type (Subject_Type_ID)
);
Create table batch_groups(
    Group_ID int auto_increment not null,
    Group_ varchar(100) not null,
    Group_Count int not null,
    Batch_ID int,
    Batch_Type_ID int,
    primary key(Group_ID),
    foreign key(Batch_ID) references batches(Batch_ID),
    foreign key(Batch_Type_ID) references batch_type(Batch_Type_ID)
);
INSERT INTO batch_groups(
        Group_ID,
        Group_,
        Group_Count,
        Batch_ID,
        Batch_Type_ID
    )
VALUES (1, 'A', 70, 10, 1),
    (2, 'A', 56, 9, 1),
    (3, 'A', 50, 8, 1),
    (4, 'A', 35, 2, 1),
    (5, 'A', 40, 1, 1);
Create table module(
    Module_ID int auto_increment not null,
    Semester_ID int,
    Subject_ID int,
    Lecturer_ID int,
    Department_ID int,
    Hall_Type_ID int DEFAULT NULL,
    Subject_Type_ID int,
    primary key(Module_ID),
    foreign key(Semester_ID) references semester(Semester_ID),
    foreign key(Subject_ID) references subjects(Subject_ID),
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID),
    foreign key (Department_ID) references department(Department_ID),
    foreign key (Hall_Type_ID) references hall_type(Hall_Type_ID),
    FOREIGN KEY (Subject_Type_ID) REFERENCES subject_type (Subject_Type_ID)
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
VALUES (5, 2, 10, 16, 1, 3, 1),
    (6, 2, 8, 17, 1, 3, 1),
    (7, 2, 13, 18, 1, 3, 1),
    (8, 2, 14, 3, 1, 3, 1),
    (9, 2, 9, 19, 1, 3, 1),
    (10, 2, 12, 20, 1, 3, 1),
    (11, 2, 14, 21, 1, 1, 2),
    (12, 2, 9, 22, 1, 4, 2),
    (13, 2, 14, 21, 1, 3, 3),
    (14, 2, 11, 23, 1, 3, 1),
    (15, 2, 8, 17, 1, 3, 1),
    (16, 4, 15, 9, 1, 3, 1),
    (17, 4, 16, 5, 1, 3, 1),
    (18, 4, 17, 6, 1, 3, 1),
    (19, 4, 18, 20, 1, 3, 1),
    (20, 4, 19, 24, 1, 3, 1),
    (21, 4, 20, 25, 1, 3, 1),
    (22, 4, 20, 25, 1, 1, 2),
    (23, 4, 15, 26, 1, 8, 2),
    (24, 4, 16, 21, 1, 10, 2),
    (25, 6, 21, 5, 1, 3, 1),
    (26, 6, 22, 27, 1, 3, 1),
    (27, 6, 23, 28, 1, 1, 2),
    (28, 6, 21, 29, 1, 1, 2),
    (29, 6, 23, 1, 1, 3, 1),
    (30, 6, 24, 30, 1, 3, 1),
    (31, 6, 25, 2, 1, 3, 1),
    (32, 6, 26, 19, 1, 3, 1),
    (33, 6, 25, 29, 1, 1, 2),
    (34, 6, 24, 31, 1, 8, 2),
    (35, 8, 30, 32, 1, 2, 2),
    (36, 8, 27, 4, 1, 3, 1),
    (37, 8, 28, 2, 1, 3, 1),
    (38, 8, 28, 29, 1, 1, 2),
    (39, 8, 29, 28, 1, 8, 2),
    (40, 8, 27, 32, 1, 2, 2),
    (41, 8, 29, 1, 1, 3, 1),
    (42, 8, 30, 4, 1, 3, 1),
    (43, 8, 31, 33, 1, 3, 1),
    (44, 8, 31, 33, 1, 11, 2),
    (45, 10, 32, 1, 1, 3, 1),
    (46, 10, 33, 16, 1, 3, 1),
    (47, 10, 33, 34, 1, 1, 2);
Create table E_T_T(
    ETT_ID int auto_increment not null,
    Module_ID int,
    Lecturer_ID int,
    Hall_ID int,
    Time_ID int,
    Day_ID int,
    Group_ID int,
    primary key(ETT_ID),
    foreign key(Module_ID) references module(Module_ID),
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID),
    foreign key(Hall_ID) references halls(Hall_ID),
    foreign key(Time_ID) references time(Time_ID),
    foreign key(Day_ID) references day(Day_ID),
    foreign key(Group_ID) references batch_groups(Group_ID)
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
VALUES (1, "جامعة حضرموت", 2, '2022/2023');