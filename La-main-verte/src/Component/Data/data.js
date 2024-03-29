// CREATE TABLE IF NOT EXISTS "user" (
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "email" TEXT NOT NULL UNIQUE,
//     "password" TEXT NOT NULL,
//     "first_name" TEXT NOT NULL,
//     "last_name" TEXT NOT NULL,
//     --"location" TEXT,
// );

// CREATE TABLE IF NOT EXISTS "zone" ( 
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "name" TEXT NOT NULL,
//     "user_id" INTEGER,
//     FOREIGN KEY ("user_id") REFERENCES "user" ("id")
// );

// CREATE TABLE IF NOT EXISTS "vegetable" (
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "growth_time" INTEGER NOT NULL,
//     "variety" TEXT,
//     "comment" TEXT,
//     "zone_id" INTEGER,
//     "family_id" INTEGER,
//     FOREIGN KEY ("zone_id") REFERENCES "zone" ("id"),
//     FOREIGN KEY ("family_id") REFERENCES "family" ("id")
// );

// CREATE TABLE IF NOT EXISTS "family" (
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "name" TEXT NOT NULL,
//     "depth" TEXT,
//     "start_date_day_seeding" INTEGER,
//     "start_date_month_seeding" INTEGER,
//     "end_date_day_seeding" INTEGER,
//     "end_date_month_seeding" INTEGER,
//     "start_date_day_planting" INTEGER NOT NULL,
//     "start_date_month_planting" INTEGER NOT NULL,
//     "end_date_day_planting" INTEGER NOT NULL,
//     "end_date_month_planting" INTEGER NOT NULL,
//     "start_date_day_harvest" INTEGER NOT NULL,
//     "start_date_month_harvest" INTEGER NOT NULL,
//     "end_date_day_harvest" INTEGER NOT NULL,
//     "end_date_month_harvest" INTEGER NOT NULL
// );


// CREATE TABLE IF NOT EXISTS "vegetable" (
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "name" TEXT NOT NULL,
//     "growth_time" INTEGER NOT NULL,
//     "variety" TEXT,
//     "comment" TEXT,
//     "zone_id" INTEGER,
//     "family_id" INTEGER,
//     FOREIGN KEY ("zone_id") REFERENCES "zone" ("id"),
//     FOREIGN KEY ("family_id") REFERENCES "family" ("id")
// );

// CREATE TABLE IF NOT EXISTS "task" (
//     "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//     "type" TEXT NOT NULL,
//     "status" BOOLEAN NOT NULL,
//     "start_date_period" DATE,
//     "end_date_period" DATE,
//     "effective_date" DATE,
//     "comment" TEXT,
//     "vegetable_id" INTEGER,
//     FOREIGN KEY ("vegetable_id") REFERENCES "vegetable" ("id"),
// );



export const zoneArray = [
    {id: 1,
    name: "jardin",
    },
    {id: 2,
    name: "serre"},
    {id: 3,
        name: "serre2"},
    {id: 4,
        name: "serre3"}
    

]

export const task = [
    {id: 1,
    type: "semer",
    status: false,
    start_date_period: "04/11/2024",
    end_date_period: "12/11/2024",
    effective_date: "08/11/2024",
    comment: "commentaire",
    vegetable_id: 1
},
{id: 2,
    type: "planter",
    status: false,
    start_date_period: "04/11/2024",
    end_date_period: "12/11/2024",
    effective_date: "08/11/2024",
    comment: "commentaire",
    vegetable_id: 1
}


]

export const vegetable = [
    {id:1,
    growth_time: 30,
    name: "tomate" ,
    variety: "",
    comment: "",
    zone_id: 2,
    family_id: null},
    
    {id:2,
    growth_time: 30,
    name: "poireau",
    variety: "",
    comment: "",
    zone_id: 2,
    family_id: null},

    {id:1,
        growth_time: 30,
        name: "tomate cerise" ,
        variety: "",
        comment: "",
        zone_id: 3,
        family_id: null},
        
        {id:2,
        growth_time: 30,
        name: "raisins",
        variety: "",
        comment: "",
        zone_id: 3,
        family_id: null}
        
    

]


