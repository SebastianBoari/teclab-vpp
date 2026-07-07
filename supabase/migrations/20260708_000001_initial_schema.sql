SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."students" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "dni" "text" NOT NULL,
    "email" "text",
    "career_id" "uuid" NOT NULL,
    "search_vector" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"spanish"'::"regconfig", ((((COALESCE("first_name", ''::"text") || ' '::"text") || COALESCE("last_name", ''::"text")) || ' '::"text") || COALESCE("dni", ''::"text")))) STORED,
    "phone_number" "text",
    CONSTRAINT "students_email_check" CHECK (("email" <> ''::"text"))
);


ALTER TABLE "public"."students" OWNER TO "postgres";


COMMENT ON TABLE "public"."students" IS 'la totalidad de los estudiantes';



CREATE OR REPLACE FUNCTION "public"."get_student_profile"("dni_input" numeric) RETURNS SETOF "public"."students"
    LANGUAGE "sql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
  SELECT * FROM students WHERE dni = dni_input LIMIT 1;
$$;


ALTER FUNCTION "public"."get_student_profile"("dni_input" numeric) OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."careers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."careers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."enrollments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "group_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL
);


ALTER TABLE "public"."enrollments" OWNER TO "postgres";


COMMENT ON TABLE "public"."enrollments" IS 'Vincula un alumno con un grupo específico.';



CREATE TABLE IF NOT EXISTS "public"."groups" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "group_name" "text" NOT NULL,
    "category" "text" NOT NULL,
    "period_id" "uuid" NOT NULL,
    "capacity" smallint NOT NULL,
    "link_meet" "text",
    "link_whapp" "text",
    "link_drive" "text",
    "tutor_id" "uuid",
    "schedule" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "eligible_careers" "uuid"[] DEFAULT '{}'::"uuid"[] NOT NULL
);


ALTER TABLE "public"."groups" OWNER TO "postgres";


COMMENT ON TABLE "public"."groups" IS 'la sumatoria de los grupos';



CREATE TABLE IF NOT EXISTS "public"."periods" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "start_at" "date" NOT NULL,
    "end_at" "date" NOT NULL,
    "name" "text",
    "enrollment_open_at" timestamp with time zone,
    "enrollment_close_at" timestamp with time zone
);


ALTER TABLE "public"."periods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tutors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text" NOT NULL,
    "career_id" "uuid"
);


ALTER TABLE "public"."tutors" OWNER TO "postgres";


ALTER TABLE ONLY "public"."careers"
    ADD CONSTRAINT "careers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_student_id_key" UNIQUE ("student_id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "group_enrollments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."periods"
    ADD CONSTRAINT "periods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_dni_key" UNIQUE ("dni");



ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tutors"
    ADD CONSTRAINT "tutors_pkey" PRIMARY KEY ("id");



CREATE INDEX "students_dni_trgm_idx" ON "public"."students" USING "gin" ("dni" "extensions"."gin_trgm_ops");



CREATE INDEX "students_first_name_trgm_idx" ON "public"."students" USING "gin" ("first_name" "extensions"."gin_trgm_ops");



CREATE INDEX "students_last_name_trgm_idx" ON "public"."students" USING "gin" ("last_name" "extensions"."gin_trgm_ops");



CREATE INDEX "students_search_vector_idx" ON "public"."students" USING "gin" ("search_vector");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "group_enrollments_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "group_enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id");



ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "public"."periods"("id");



ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "public"."tutors"("id");



ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("id");



ALTER TABLE ONLY "public"."tutors"
    ADD CONSTRAINT "tutors_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("id");



CREATE POLICY "Admin Full Access Careers" ON "public"."careers" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Admin Full Access Enrollments" ON "public"."enrollments" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Admin Full Access Groups" ON "public"."groups" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Admin Full Access Periods" ON "public"."periods" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Admin Full Access Students" ON "public"."students" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Admin Full Access Tutors" ON "public"."tutors" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Public Insert Enrollments" ON "public"."enrollments" FOR INSERT WITH CHECK (true);



CREATE POLICY "Public Read Careers" ON "public"."careers" FOR SELECT USING (true);



CREATE POLICY "Public Read Enrollments" ON "public"."enrollments" FOR SELECT USING (true);



CREATE POLICY "Public Read Groups" ON "public"."groups" FOR SELECT USING (true);



CREATE POLICY "Public Read Periods" ON "public"."periods" FOR SELECT USING (true);



CREATE POLICY "Public Read Tutors" ON "public"."tutors" FOR SELECT USING (true);



ALTER TABLE "public"."careers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."enrollments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."groups" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."periods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."students" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tutors" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."students" TO "anon";
GRANT ALL ON TABLE "public"."students" TO "authenticated";
GRANT ALL ON TABLE "public"."students" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_student_profile"("dni_input" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."get_student_profile"("dni_input" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_student_profile"("dni_input" numeric) TO "service_role";



GRANT ALL ON TABLE "public"."careers" TO "anon";
GRANT ALL ON TABLE "public"."careers" TO "authenticated";
GRANT ALL ON TABLE "public"."careers" TO "service_role";



GRANT ALL ON TABLE "public"."enrollments" TO "anon";
GRANT ALL ON TABLE "public"."enrollments" TO "authenticated";
GRANT ALL ON TABLE "public"."enrollments" TO "service_role";



GRANT ALL ON TABLE "public"."groups" TO "anon";
GRANT ALL ON TABLE "public"."groups" TO "authenticated";
GRANT ALL ON TABLE "public"."groups" TO "service_role";



GRANT ALL ON TABLE "public"."periods" TO "anon";
GRANT ALL ON TABLE "public"."periods" TO "authenticated";
GRANT ALL ON TABLE "public"."periods" TO "service_role";



GRANT ALL ON TABLE "public"."tutors" TO "anon";
GRANT ALL ON TABLE "public"."tutors" TO "authenticated";
GRANT ALL ON TABLE "public"."tutors" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







