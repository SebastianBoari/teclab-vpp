SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict MABrdhVAY21AuBcj8uwreObybiba0SIpUFSGo3NelUzIgyEXozNVuMcqSOMNnyU

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: careers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."careers" ("id", "created_at", "name") VALUES
	('66a0bf85-0954-47d1-bcf7-eb8f32401de9', '2025-10-25 22:36:35.451061+00', 'Tecnicatura Superior en Gestion Contable'),
	('8828137b-52c3-4cde-95eb-a610cf29c930', '2025-10-25 22:36:35.451061+00', 'Tecnicatura Superior en Programación'),
	('8c85a83f-5982-4529-bfbe-263003ca3af9', '2026-06-03 20:45:50.6017+00', 'Tecnicatura Superior en Gestión Agraria'),
	('a2d35889-76b7-4e7b-8c26-6147be05d462', '2025-10-25 22:36:35.451061+00', 'Tecnicatura Superior en Marketing Digital');


--
-- Data for Name: periods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."periods" ("id", "created_at", "start_at", "end_at", "name", "enrollment_open_at", "enrollment_close_at") VALUES
	('fb1378fb-dc36-4274-b071-1c1a2f6006ed', '2025-10-25 22:36:35.451061+00', '2025-09-01', '2025-12-31', '3A', '2025-09-18 12:00:00+00', '2025-11-17 12:00:00+00'),
	('2ab23a76-4e50-454c-a65f-d565583a8be8', '2025-12-19 15:49:01.390351+00', '2026-03-29', '2026-04-29', '3A', '2026-03-29 00:00:00+00', '2026-04-29 00:00:00+00'),
	('9b9047f0-e1a9-4f66-a916-6af1df29faf8', '2026-05-18 17:51:43.60924+00', '2026-05-31', '2026-09-21', '1A', '2026-05-18 00:00:00+00', '2026-06-18 00:00:00+00');


--
-- Data for Name: tutors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tutors" ("id", "created_at", "first_name", "last_name", "career_id") VALUES
	('d7f4fc81-2e51-4530-bf55-b43b40caca1b', '2025-10-25 22:36:35.451061+00', 'Santiago', 'Perez', '8828137b-52c3-4cde-95eb-a610cf29c930'),
	('a8281184-9d21-42f3-b09d-55cda6720163', '2025-10-25 22:36:35.451061+00', 'Milagros', 'Gonzalez', 'a2d35889-76b7-4e7b-8c26-6147be05d462'),
	('bc543b64-e640-4ddf-898f-e53e03780dbe', '2025-10-25 22:36:35.451061+00', 'Martín', 'Gomez', '66a0bf85-0954-47d1-bcf7-eb8f32401de9'),
	('1961bf4a-1bb3-4bfd-a6c8-063f6f4d48e4', '2026-03-03 22:03:29.950898+00', 'Sebastián', 'Boari', '8828137b-52c3-4cde-95eb-a610cf29c930');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."groups" ("id", "created_at", "group_name", "category", "period_id", "capacity", "link_meet", "link_whapp", "link_drive", "tutor_id", "schedule", "eligible_careers") VALUES
	('5dfad66a-7d55-42e5-b0fd-af44e5e2d1b7', '2025-10-25 22:36:35.451061+00', 'G2', 'IT', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'd7f4fc81-2e51-4530-bf55-b43b40caca1b', '[{"day": "Martes", "time": "20:00-21:00"}, {"day": "Jueves", "time": "20:00-21:00"}]', '{8828137b-52c3-4cde-95eb-a610cf29c930,a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('8c6a9a49-ae98-4015-8000-637b8f4ea753', '2025-10-25 22:36:35.451061+00', 'G3', 'Marketing', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'a8281184-9d21-42f3-b09d-55cda6720163', '[{"day": "Martes", "time": "20:00-21:00"}, {"day": "Jueves", "time": "20:00-21:00"}]', '{a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('93147034-9693-4cad-bd7c-d180eb47d382', '2025-10-25 22:36:35.451061+00', 'G3', 'Contabilidad', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'bc543b64-e640-4ddf-898f-e53e03780dbe', '[{"day": "Viernes", "time": "20:00-22:00"}]', '{66a0bf85-0954-47d1-bcf7-eb8f32401de9}'),
	('94bdf748-19a9-4a38-9875-5a16af8b3e70', '2025-10-25 22:36:35.451061+00', 'G3', 'IT', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'd7f4fc81-2e51-4530-bf55-b43b40caca1b', '[{"day": "Lunes", "time": "19:00-20:00"}, {"day": "Miercoles", "time": "19:00-20:00"}]', '{8828137b-52c3-4cde-95eb-a610cf29c930,a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('4ad5bcc8-2fcf-4146-8a03-d839d60e0204', '2025-10-25 22:36:35.451061+00', 'G1', 'Marketing', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'a8281184-9d21-42f3-b09d-55cda6720163', '[{"day": "Sábado", "time": "10:00-12:00"}]', '{a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('a917df8e-65be-4728-9676-370c3bb1a623', '2025-10-25 22:36:35.451061+00', 'G4', 'Marketing', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'a8281184-9d21-42f3-b09d-55cda6720163', '[{"day": "Lunes", "time": "19:00-20:00"}, {"day": "Miercoles", "time": "19:00-20:00"}]', '{a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('577c477d-29c0-4afc-84ac-c3a75baa46b6', '2025-10-25 22:36:35.451061+00', 'G2', 'Contabilidad', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'bc543b64-e640-4ddf-898f-e53e03780dbe', '[{"day": "Martes", "time": "18:00-19:00"}, {"day": "Jueves", "time": "18:00-19:00"}]', '{66a0bf85-0954-47d1-bcf7-eb8f32401de9}'),
	('5db2b44e-266d-4386-8fd6-30777f716821', '2025-10-25 22:36:35.451061+00', 'G2', 'Marketing', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'a8281184-9d21-42f3-b09d-55cda6720163', '[{"day": "Lunes", "time": "21:00-22:00"}, {"day": "Miercoles", "time": "21:00-22:00"}]', '{a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('308f6f99-ae33-4b33-b4e3-b07834c74b25', '2025-10-25 22:36:35.451061+00', 'G1', 'Contabilidad', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, NULL, NULL, NULL, 'bc543b64-e640-4ddf-898f-e53e03780dbe', '[{"day": "Sábado", "time": "10:00-12:00"}]', '{66a0bf85-0954-47d1-bcf7-eb8f32401de9}'),
	('aced631f-763c-45db-853c-9884ba5d8f2b', '2025-10-25 22:36:35.451061+00', 'G4', 'IT', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'd7f4fc81-2e51-4530-bf55-b43b40caca1b', '[{"day": "Sábado", "time": "10:00-12:00"}]', '{8828137b-52c3-4cde-95eb-a610cf29c930,a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('dbb85679-6ac2-455f-a362-bab97282f1e3', '2025-10-25 22:36:35.451061+00', 'G5', 'Marketing', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'a8281184-9d21-42f3-b09d-55cda6720163', '[{"day": "Viernes", "time": "20:00-22:00"}]', '{a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('df508bf0-3c5b-4c67-adb4-8b9582b20cb8', '2025-10-25 22:36:35.451061+00', 'G4', 'Contabilidad', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'bc543b64-e640-4ddf-898f-e53e03780dbe', '[{"day": "Lunes", "time": "18:00-19:00"}, {"day": "Viernes", "time": "18:00-19:00"}]', '{66a0bf85-0954-47d1-bcf7-eb8f32401de9}'),
	('f1d7de30-206b-4651-b5c3-94b3855fbfd5', '2025-10-25 22:36:35.451061+00', 'G5', 'IT', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'd7f4fc81-2e51-4530-bf55-b43b40caca1b', '[{"day": "Viernes", "time": "20:00-22:00"}]', '{8828137b-52c3-4cde-95eb-a610cf29c930,a2d35889-76b7-4e7b-8c26-6147be05d462}'),
	('fd488df5-bba1-476b-856d-2f873823150b', '2025-10-25 22:36:35.451061+00', 'G5', 'Contabilidad', '2ab23a76-4e50-454c-a65f-d565583a8be8', 10, '#', '#', NULL, 'bc543b64-e640-4ddf-898f-e53e03780dbe', '[{"day": "Sábado", "time": "10:00-12:00"}]', '{66a0bf85-0954-47d1-bcf7-eb8f32401de9}'),
	('324edacc-ec89-4252-9fdf-726941e27ca4', '2025-10-25 22:36:35.451061+00', 'G1', 'IT', '2ab23a76-4e50-454c-a65f-d565583a8be8', 32, 'https://meet.google.com/szw-szan-hvv', 'https://chat.whatsapp.com/JarjhoGydzN7ZvAh85P587', NULL, 'd7f4fc81-2e51-4530-bf55-b43b40caca1b', '[{"day": "Lunes", "time": "20:00-21:00"}, {"day": "Miercoles", "time": "20:00-21:00"}]', '{8828137b-52c3-4cde-95eb-a610cf29c930,a2d35889-76b7-4e7b-8c26-6147be05d462}');


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."students" ("id", "created_at", "first_name", "last_name", "dni", "email", "career_id", "phone_number") VALUES
	('4eeade9d-d65a-4101-aae4-938aa0414484', '2025-10-25 22:36:35.451061+00', 'Lucia', 'Garcia', '10000001', 'lucia@test.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('ccd1a0ae-68e1-414f-801b-b771e8810458', '2025-10-25 22:36:35.451061+00', 'Mateo', 'Rodriguez', '10000002', 'mateo@test.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('edeb1e62-b027-41b7-80ff-24e19a7c0f68', '2025-10-25 22:36:35.451061+00', 'Sofia', 'Martinez', '10000003', 'sofia@test.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('4f8303e0-6011-46bb-88a6-e5e6af5902f0', '2025-10-25 22:36:35.451061+00', 'Bautista', 'Lopez', '10000004', 'bautista@test.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('c99a49d3-2784-498e-8295-f9db00821ad3', '2025-10-25 22:36:35.451061+00', 'Valentina', 'Sanchez', '10000005', 'valentina@test.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('af90171f-4331-4bfa-9d6f-2143e62fb7e6', '2025-10-25 22:36:35.451061+00', 'Joaquin', 'Diaz', '20000001', 'joaquin@test.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('c84949cb-ed6b-4e1b-b55d-d13650add878', '2025-10-25 22:36:35.451061+00', 'Martina', 'Alvarez', '20000002', 'martina@test.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('7dd9206d-ca06-487d-8bb3-353228116ad7', '2025-10-25 22:36:35.451061+00', 'Tomas', 'Romero', '20000003', 'tomas@test.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('e38c14da-c88d-40f3-b958-31a214e91020', '2025-10-25 22:36:35.451061+00', 'Catalina', 'Suarez', '20000004', 'catalina@test.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('b7ebf319-8eee-4979-ba6b-675509edbee9', '2025-10-25 22:36:35.451061+00', 'Felipe', 'Torres', '20000005', 'felipe@test.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('5cd3417e-a396-42da-b474-2401a410c692', '2025-10-25 22:36:35.451061+00', 'Agustin', 'Gutierrez', '30000001', 'agustin@test.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('ca6d9700-9a93-4ce9-85a4-36515d7e7aa9', '2025-10-25 22:36:35.451061+00', 'Emilia', 'Ruiz', '30000002', 'emilia@test.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('d9f7d4de-de02-435a-ab40-c3382878bff1', '2025-10-25 22:36:35.451061+00', 'Nicolas', 'Peralta', '30000003', 'nicolas@test.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('27aba415-69c1-47e7-8b57-043762ef1795', '2025-10-25 22:36:35.451061+00', 'Renata', 'Sosa', '30000004', 'renata@test.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('d126b19d-0578-4d58-95eb-b74b8b9be335', '2025-10-25 22:36:35.451061+00', 'Dante', 'Ramirez', '30000005', 'dante@test.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('a8ed11fe-4b80-4cff-81a9-8576ff24167e', '2026-06-03 21:22:27.46043+00', 'Cristian', 'Guerrero', '40555333', 'cguerrero@gmail.com', '8828137b-52c3-4cde-95eb-a610cf29c930', NULL),
	('415b4aeb-11c3-4fdd-ae9b-e507092497cd', '2026-06-09 01:21:08.246479+00', 'Lucio', 'Carmona', '31123321', 'luciocarmona@gmail.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('2f1f4ddd-48f4-4ea2-8d00-cf3b7b76428e', '2026-06-11 17:36:44.326+00', 'Lucas ', 'Luciano', '31311311', 'lucasluciano@gmail.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', NULL),
	('35c103a6-655a-40b7-8507-61bf2d95c9d1', '2026-06-17 20:44:03.17442+00', 'Martín', 'Martinez', '12121121', 'mmartinez@gmail.com', 'a2d35889-76b7-4e7b-8c26-6147be05d462', NULL),
	('29297f19-ed6b-4ea2-82e6-b3e473b89d4a', '2026-06-17 20:45:15.848276+00', 'Luciano', 'Portuano', '54123123', 'lportuano@gmail.com', '8c85a83f-5982-4529-bfbe-263003ca3af9', '+543516604016'),
	('f20cb64e-d649-45a6-80a8-6efcb4ccc90f', '2026-06-29 19:46:01.146417+00', 'German', 'Rodriguez', '13443131', 'grodriguez@gmail.com', '66a0bf85-0954-47d1-bcf7-eb8f32401de9', '+543443313101');


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."enrollments" ("id", "created_at", "group_id", "student_id") VALUES
	('3011e3d7-0edd-41f0-b948-3a2ab79afc7d', '2026-01-07 16:06:28.13172+00', '324edacc-ec89-4252-9fdf-726941e27ca4', '4eeade9d-d65a-4101-aae4-938aa0414484'),
	('823921b6-fc84-4d3c-825b-fc9114d79802', '2026-01-07 16:17:11.040493+00', '308f6f99-ae33-4b33-b4e3-b07834c74b25', '27aba415-69c1-47e7-8b57-043762ef1795'),
	('0c862cd2-93e5-4f15-9a26-9c331f4dc823', '2026-01-09 16:23:52.942321+00', '5dfad66a-7d55-42e5-b0fd-af44e5e2d1b7', '4f8303e0-6011-46bb-88a6-e5e6af5902f0');


--
-- PostgreSQL database dump complete
--

-- \unrestrict MABrdhVAY21AuBcj8uwreObybiba0SIpUFSGo3NelUzIgyEXozNVuMcqSOMNnyU

RESET ALL;
