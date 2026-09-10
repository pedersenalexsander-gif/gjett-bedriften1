import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const inquiries=sqliteTable('inquiries',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),topic:text('topic').notNull(),message:text('message').notNull(),design:text('design').notNull(),createdAt:integer('created_at').notNull()},t=>[index('idx_inquiries_created').on(t.createdAt)]);
export const limits=sqliteTable('request_limits',{key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
