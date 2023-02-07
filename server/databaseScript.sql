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
    
	Create table hall_type (
	Hall_Type_ID int auto_increment not null,
    Type_Name varchar(50) not null,
    primary key(Hall_Type_ID)
    );
    
    Create table building (
    Building_ID int auto_increment not null,
    Building_Name varchar(50) not null UNIQUE,
    primary key(Building_ID)
    );
    
    Create table semester (
    Semester_ID int auto_increment not null,
    Semester_Name varchar(50) not null,
    primary key(Semester_ID)
    );
    
    Create table college (
    College_ID int auto_increment not null,
    College_Name varchar(150) not null UNIQUE,
    primary key(College_ID)
    );
    
    Create table department (
    Department_ID int auto_increment not null,
    Department_Name varchar(150) not null UNIQUE,
    College_ID int,
    primary key(Department_ID),
    foreign key(College_ID) references college(College_ID)
    );
    
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
    
    Create table batches (
    Batch_ID int auto_increment not null,
    Batch_General_Count int,
    Batch_Payment_Count int,
    Batch_Parallel_Count int;
    College_ID int,
    Level_ID int,
    Department_ID int,
    primary key(Batch_ID),
    foreign key(College_ID) references college(College_ID),
    foreign key(Level_ID) references level(Level_ID),
    foreign key(Department_ID) references department(Department_ID)
    );
    
    Create table halls (
    Hall_ID int auto_increment not null,
    Hall_Name varchar(100) not null UNIQUE,
    Hall_Capacity int not null,
    Department_ID int,
    Building_ID int,
    Hall_Type_ID int,
	primary key(Hall_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(Building_ID) references building(Building_ID),
    foreign key(Hall_Type_ID) references hall_type(Hall_Type_ID)
    );
    
    Create table subjects(
    Subject_ID int auto_increment not null,
    Subject_Name varchar(100) not null,
    Subject_Code varchar(50) not null,
    Subject_Credit int not null,
    Department_ID int,
    College_ID int,
    primary key(Subject_ID),
	foreign key(Department_ID) references department(Department_ID),
    foreign key(College_ID) references college(College_ID)
    );
    
    Create table lecturer(
    Lecturer_ID int auto_increment not null,
    Lecturer_Name varchar(100) not null,
    Department_ID int,
    College_ID int,
    primary key(Lecturer_ID),
    foreign key(Department_ID) references department(Department_ID),
    foreign key(College_ID) references college(College_ID)
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
    primary key(Module_ID),
    foreign key(Semester_ID) references semester(Semester_ID),
    foreign key(Subject_ID) references subjects(Subject_ID),
    foreign key(Lecturer_ID) references lecturer(Lecturer_ID)
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