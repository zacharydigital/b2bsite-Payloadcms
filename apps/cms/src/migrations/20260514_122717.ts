import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`technical_specs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`unit\` text,
  	\`min_value\` numeric,
  	\`max_value\` numeric,
  	\`material\` text,
  	\`condition\` text,
  	\`source_note\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`technical_specs_slug_idx\` ON \`technical_specs\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`technical_specs_updated_at_idx\` ON \`technical_specs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`technical_specs_created_at_idx\` ON \`technical_specs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`experts_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`credential\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experts_credentials_order_idx\` ON \`experts_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experts_credentials_parent_id_idx\` ON \`experts_credentials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`experts_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experts_social_links_order_idx\` ON \`experts_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experts_social_links_parent_id_idx\` ON \`experts_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`experts_project_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`highlight\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`experts_project_highlights_order_idx\` ON \`experts_project_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`experts_project_highlights_parent_id_idx\` ON \`experts_project_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`experts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`avatar\` text NOT NULL,
  	\`bio\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`experts_slug_idx\` ON \`experts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`experts_updated_at_idx\` ON \`experts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`experts_created_at_idx\` ON \`experts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_assist_gas_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gas\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_assist_gas_types_order_idx\` ON \`products_assist_gas_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_assist_gas_types_parent_id_idx\` ON \`products_assist_gas_types\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_compliance_standards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`standard\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_compliance_standards_order_idx\` ON \`products_compliance_standards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_compliance_standards_parent_id_idx\` ON \`products_compliance_standards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_application_limits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`limit\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_application_limits_order_idx\` ON \`products_application_limits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_application_limits_parent_id_idx\` ON \`products_application_limits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_recommended_for\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`application\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_recommended_for_order_idx\` ON \`products_recommended_for\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_recommended_for_parent_id_idx\` ON \`products_recommended_for\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_gallery_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text NOT NULL,
  	\`priority\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_gallery_media_order_idx\` ON \`products_gallery_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_gallery_media_parent_id_idx\` ON \`products_gallery_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_feature_advantages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`feature\` text NOT NULL,
  	\`advantage\` text NOT NULL,
  	\`benefit\` text NOT NULL,
  	\`evidence\` text NOT NULL,
  	\`image\` text NOT NULL,
  	\`report_link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_feature_advantages_order_idx\` ON \`products_feature_advantages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_feature_advantages_parent_id_idx\` ON \`products_feature_advantages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_applications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`image\` text NOT NULL,
  	\`linked_solution_path\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_applications_order_idx\` ON \`products_applications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_applications_parent_id_idx\` ON \`products_applications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_certifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`level\` text NOT NULL,
  	\`issuer\` text NOT NULL,
  	\`certificate_no\` text NOT NULL,
  	\`valid_until\` text NOT NULL,
  	\`image\` text NOT NULL,
  	\`requestable\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_certifications_order_idx\` ON \`products_certifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_certifications_parent_id_idx\` ON \`products_certifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_manufacturing_qc_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` text NOT NULL,
  	\`detail\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_manufacturing_qc_process_steps_order_idx\` ON \`products_manufacturing_qc_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_manufacturing_qc_process_steps_parent_id_idx\` ON \`products_manufacturing_qc_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_manufacturing_qc_factory_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_manufacturing_qc_factory_images_order_idx\` ON \`products_manufacturing_qc_factory_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_manufacturing_qc_factory_images_parent_id_idx\` ON \`products_manufacturing_qc_factory_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_downloads\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`pages\` numeric NOT NULL,
  	\`file_label\` text NOT NULL,
  	\`gate_required\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_downloads_order_idx\` ON \`products_downloads\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_downloads_parent_id_idx\` ON \`products_downloads\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_related_product_slugs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_related_product_slugs_order_idx\` ON \`products_related_product_slugs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_related_product_slugs_parent_id_idx\` ON \`products_related_product_slugs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_material_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`material\` text NOT NULL,
  	\`max_thickness_mm\` numeric NOT NULL,
  	\`recommended_thickness_mm\` text NOT NULL,
  	\`assist_gas\` text NOT NULL,
  	\`cutting_speed_m_min\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_material_capabilities_order_idx\` ON \`products_material_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_material_capabilities_parent_id_idx\` ON \`products_material_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`model\` text NOT NULL,
  	\`series\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`hero_image\` text NOT NULL,
  	\`power_kw\` numeric NOT NULL,
  	\`positioning_accuracy\` text NOT NULL,
  	\`repeat_positioning_accuracy\` text NOT NULL,
  	\`servo_motor_brand\` text NOT NULL,
  	\`commercial_terms_moq\` text NOT NULL,
  	\`commercial_terms_lead_time\` text NOT NULL,
  	\`commercial_terms_payment\` text NOT NULL,
  	\`commercial_terms_sample\` text NOT NULL,
  	\`commercial_terms_packaging\` text NOT NULL,
  	\`commercial_terms_export_markets\` text NOT NULL,
  	\`manufacturing_qc_capacity_text\` text NOT NULL,
  	\`manufacturing_qc_walkthrough_video\` text,
  	\`inquiry_defaults_reply_sla\` text NOT NULL,
  	\`inquiry_defaults_privacy_promise\` text NOT NULL,
  	\`inquiry_defaults_nda_available\` integer DEFAULT true,
  	\`inquiry_defaults_whatsapp_url\` text NOT NULL,
  	\`inquiry_defaults_social_proof_text\` text NOT NULL,
  	\`tracking_meta_category\` text NOT NULL,
  	\`tracking_meta_primary_application\` text NOT NULL,
  	\`tracking_meta_conversion_goal\` text NOT NULL,
  	\`expert_id\` integer NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`expert_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_expert_idx\` ON \`products\` (\`expert_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`technical_specs_id\` integer,
  	\`case_studies_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`technical_specs_id\`) REFERENCES \`technical_specs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_technical_specs_id_idx\` ON \`products_rels\` (\`technical_specs_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_case_studies_id_idx\` ON \`products_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_faqs_id_idx\` ON \`products_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_field_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`caption\` text NOT NULL,
  	\`captured_at\` text NOT NULL,
  	\`location\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_field_media_order_idx\` ON \`case_studies_field_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_field_media_parent_id_idx\` ON \`case_studies_field_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_measured_results\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`metric\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`context\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_measured_results_order_idx\` ON \`case_studies_measured_results\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_measured_results_parent_id_idx\` ON \`case_studies_measured_results\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`customer_industry\` text NOT NULL,
  	\`country\` text NOT NULL,
  	\`pain_point\` text NOT NULL,
  	\`product_id\` integer NOT NULL,
  	\`expert_id\` integer NOT NULL,
  	\`hero_image\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`expert_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_product_idx\` ON \`case_studies\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_expert_idx\` ON \`case_studies\` (\`expert_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`related_product_id\` integer,
  	\`related_case_id\` integer,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`related_product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_case_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faqs_slug_idx\` ON \`faqs\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`faqs_related_product_idx\` ON \`faqs\` (\`related_product_id\`);`)
  await db.run(sql`CREATE INDEX \`faqs_related_case_idx\` ON \`faqs\` (\`related_case_id\`);`)
  await db.run(sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`content_pages_body_blocks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`content\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`content_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`content_pages_body_blocks_order_idx\` ON \`content_pages_body_blocks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_body_blocks_parent_id_idx\` ON \`content_pages_body_blocks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`content_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`seo_summary\` text NOT NULL,
  	\`hero_answer\` text NOT NULL,
  	\`expert_id\` integer,
  	\`claim_claim_text\` text,
  	\`claim_verdict\` text,
  	\`claim_reviewed_by\` text,
  	\`governance_last_reviewed_at\` text NOT NULL,
  	\`governance_next_review_at\` text NOT NULL,
  	\`governance_review_status\` text DEFAULT 'fresh' NOT NULL,
  	\`governance_content_owner\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`expert_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`content_pages_slug_idx\` ON \`content_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_expert_idx\` ON \`content_pages\` (\`expert_id\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_updated_at_idx\` ON \`content_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_created_at_idx\` ON \`content_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`content_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	\`content_pages_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`content_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_pages_id\`) REFERENCES \`content_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`content_pages_rels_order_idx\` ON \`content_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_rels_parent_idx\` ON \`content_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_rels_path_idx\` ON \`content_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_rels_products_id_idx\` ON \`content_pages_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_rels_content_pages_id_idx\` ON \`content_pages_rels\` (\`content_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`content_pages_rels_faqs_id_idx\` ON \`content_pages_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`technical_specs_id\` integer,
  	\`experts_id\` integer,
  	\`products_id\` integer,
  	\`case_studies_id\` integer,
  	\`faqs_id\` integer,
  	\`content_pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`technical_specs_id\`) REFERENCES \`technical_specs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experts_id\`) REFERENCES \`experts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`content_pages_id\`) REFERENCES \`content_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_technical_specs_id_idx\` ON \`payload_locked_documents_rels\` (\`technical_specs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_experts_id_idx\` ON \`payload_locked_documents_rels\` (\`experts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_content_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`content_pages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_order_idx\` ON \`site_settings_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_parent_id_idx\` ON \`site_settings_same_as\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_name\` text NOT NULL,
  	\`legal_name\` text NOT NULL,
  	\`tagline\` text NOT NULL,
  	\`site_url\` text NOT NULL,
  	\`logo_url\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`address_street_address\` text NOT NULL,
  	\`address_address_locality\` text NOT NULL,
  	\`address_address_region\` text NOT NULL,
  	\`address_postal_code\` text NOT NULL,
  	\`address_address_country\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`technical_specs\`;`)
  await db.run(sql`DROP TABLE \`experts_credentials\`;`)
  await db.run(sql`DROP TABLE \`experts_social_links\`;`)
  await db.run(sql`DROP TABLE \`experts_project_highlights\`;`)
  await db.run(sql`DROP TABLE \`experts\`;`)
  await db.run(sql`DROP TABLE \`products_assist_gas_types\`;`)
  await db.run(sql`DROP TABLE \`products_compliance_standards\`;`)
  await db.run(sql`DROP TABLE \`products_application_limits\`;`)
  await db.run(sql`DROP TABLE \`products_recommended_for\`;`)
  await db.run(sql`DROP TABLE \`products_gallery_media\`;`)
  await db.run(sql`DROP TABLE \`products_feature_advantages\`;`)
  await db.run(sql`DROP TABLE \`products_applications\`;`)
  await db.run(sql`DROP TABLE \`products_certifications\`;`)
  await db.run(sql`DROP TABLE \`products_manufacturing_qc_process_steps\`;`)
  await db.run(sql`DROP TABLE \`products_manufacturing_qc_factory_images\`;`)
  await db.run(sql`DROP TABLE \`products_downloads\`;`)
  await db.run(sql`DROP TABLE \`products_related_product_slugs\`;`)
  await db.run(sql`DROP TABLE \`products_material_capabilities\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_field_media\`;`)
  await db.run(sql`DROP TABLE \`case_studies_measured_results\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`faqs\`;`)
  await db.run(sql`DROP TABLE \`content_pages_body_blocks\`;`)
  await db.run(sql`DROP TABLE \`content_pages\`;`)
  await db.run(sql`DROP TABLE \`content_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings_same_as\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
