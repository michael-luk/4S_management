# Host: localhost  (Version: 5.1.62-community)
# Date: 2020-03-30 12:33:53
# Generator: MySQL-Front 5.3  (Build 4.120)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin"
#

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `descriptions` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `last_login_ip_area` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `user_role_enum` int(11) DEFAULT NULL,
  `comment` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "admin"
#

INSERT INTO `admin` VALUES (1,'admin_1','e10adc3949ba59abbe56e057f20f883e','0',NULL,'2020-03-30 12:30:13','0',NULL,'0',0,0,'0'),(2,'admin_2','e10adc3949ba59abbe56e057f20f883e','1',NULL,'2020-03-30 12:30:13','1',NULL,'1',0,1,'1'),(3,'admin_3','e10adc3949ba59abbe56e057f20f883e','2',NULL,'2020-03-30 12:30:13','2',NULL,'2',0,2,'2');

#
# Structure for table "admin_journal"
#

DROP TABLE IF EXISTS `admin_journal`;
CREATE TABLE `admin_journal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `actor` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actor_level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "admin_journal"
#

INSERT INTO `admin_journal` VALUES (1,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:40'),(2,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:41'),(3,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:42'),(4,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:42'),(5,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:43'),(6,'修改_车辆',NULL,'超级管理员','2020-03-30 12:30:44');

#
# Structure for table "config"
#

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type_enum` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "config"
#

INSERT INTO `config` VALUES (1,'is.prod','no',3,NULL,'2020-03-30 12:30:13','是否生产模式(yes/no)'),(2,'admin.login','yes',3,NULL,'2020-03-30 12:30:13','是否启用管理员权限(yes/no), 若不启用则后台不需要管理员登陆'),(3,'websocket','yes',3,NULL,'2020-03-30 12:30:13','是否启用即时通讯'),(4,'app.name','4S接车管理',0,NULL,'2020-03-30 12:30:13','网站名称'),(5,'weixin.appid','wx687e9ea2900af',0,NULL,'2020-03-30 12:30:13','微信公众号appid'),(6,'weixin.secret','b6781a4c31e019a3f243514dae493',0,NULL,'2020-03-30 12:30:13','微信公众号secret'),(7,'weixin.token','woyest',0,NULL,'2020-03-30 12:30:13','微信公众号token'),(8,'weixin.aes','QYnBBbbQhdjPgDDPFyMvg9EfjYxd2lLW3z3RTxab',0,NULL,'2020-03-30 12:30:13','微信公众号aes'),(9,'sms.server','sms.todaynic.com',0,NULL,'2020-03-30 12:30:13','第三方短信验证码服务器'),(10,'sms.port','2002',0,NULL,'2020-03-30 12:30:13','第三方短信验证码端口'),(11,'sms.uid','ms10',0,NULL,'2020-03-30 12:30:13','第三方短信验证码用户名'),(12,'sms.psw','mt',0,NULL,'2020-03-30 12:30:13','第三方短信验证码密码'),(13,'protocol','http',0,NULL,'2020-03-30 12:30:13','协议(http或https)'),(14,'domain.name','localhost:9000',0,NULL,'2020-03-30 12:30:13','域名 (若本地则localhost:9000, 带端口号), 不带http头'),(15,'company.name','珠海和益科技有限公司',0,NULL,'2020-03-30 12:30:13','公司名称'),(16,'user.timeout.minute','30',1,NULL,'2020-03-30 12:30:13','用户登陆过期时间(分钟), 超过此时间需重新登陆'),(17,'admin.timeout.minute','30',1,NULL,'2020-03-30 12:30:13','管理员登陆过期时间(分钟), 超过此时间需重新登陆'),(18,'forget.password.email.timeout.minute','30',1,NULL,'2020-03-30 12:30:13','重置密码邮件验证的过期时间(分钟), 超过此时间需要重新申请'),(19,'email.send.protect.second','20',1,NULL,'2020-03-30 12:30:13','邮件发送频率保护时间(秒)'),(20,'pic.thumb.size','200',2,NULL,'2020-03-30 12:30:13','图片缩略图尺寸(如200)'),(21,'pic.mid.thumb.size','500',2,NULL,'2020-03-30 12:30:13','图片中等缩略图尺寸(如500)');

#
# Structure for table "info"
#

DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `classify` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `visible` tinyint(1) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `small_images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "info"
#

INSERT INTO `info` VALUES (1,'info_1','0','0','0',1,0,'0','0',NULL,'2020-03-30 12:30:13','0','0','0'),(2,'info_2','1','1','1',0,1,'1','1',NULL,'2020-03-30 12:30:13','1','1','1'),(3,'info_3','2','2','2',1,2,'2','2',NULL,'2020-03-30 12:30:13','2','2','2');

#
# Structure for table "play_evolutions"
#

DROP TABLE IF EXISTS `play_evolutions`;
CREATE TABLE `play_evolutions` (
  `id` int(11) NOT NULL,
  `hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `applied_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `apply_script` text COLLATE utf8_unicode_ci,
  `revert_script` text COLLATE utf8_unicode_ci,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_problem` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "play_evolutions"
#

INSERT INTO `play_evolutions` VALUES (1,'b557d6368c23614a1bb6457ce0fe73df97840710','2020-03-30 12:30:12','create table admin (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\npassword                  varchar(255) not null,\ndescriptions              varchar(255),\nlast_update_time          datetime,\ncreated_at                datetime,\nlast_login_ip             varchar(255),\nlast_login_time           datetime,\nlast_login_ip_area        varchar(255),\nstatus                    integer,\nuser_role_enum            integer,\ncomment                   varchar(1000),\nconstraint pk_admin primary key (id))\n;\n\ncreate table admin_journal (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nactor                     varchar(255),\nactor_level               varchar(255),\ncreated_at                datetime,\nconstraint pk_admin_journal primary key (id))\n;\n\ncreate table car (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nclassify                  varchar(255),\nstatus                    integer,\nis_vip                    tinyint(1) default 0,\nleave_record_enum         integer,\nleave_reason              varchar(255),\nimages                    longtext,\nsmall_images              longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nref_user_id               bigint,\nuser_id                   bigint,\nconstraint pk_car primary key (id))\n;\n\ncreate table complain (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\ndescription               varchar(1000),\nref_user_id               bigint,\nuser_id                   bigint,\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ncomment                   varchar(255),\nconstraint pk_complain primary key (id))\n;\n\ncreate table config (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\ncontent                   varchar(255) not null,\ntype_enum                 integer not null,\nlast_update_time          datetime,\ncreated_at                datetime,\ncomment                   varchar(255),\nconstraint pk_config primary key (id))\n;\n\ncreate table feedback (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\ndescription               varchar(1000),\nref_user_id               bigint,\nuser_id                   bigint,\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ncomment                   varchar(255),\nconstraint pk_feedback primary key (id))\n;\n\ncreate table fix (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\nref_car_id                bigint,\ncar_id                    bigint,\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nconstraint pk_fix primary key (id))\n;\n\ncreate table info (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nclassify                  varchar(255),\nphone                     varchar(255),\nurl                       varchar(255),\nvisible                   tinyint(1) default 0,\nstatus                    integer,\nimages                    longtext,\nsmall_images              longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nconstraint pk_info primary key (id))\n;\n\ncreate table pop (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nclassify                  varchar(255),\nstatus                    integer,\nimages                    longtext,\nsmall_images              longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nconstraint pk_pop primary key (id))\n;\n\ncreate table product (\nid                        bigint auto_increment not null,\nshow_no                   varchar(255),\nname                      varchar(255),\nsold_number               integer,\nunit                      varchar(255),\nlast_update_time          datetime,\ncreated_at                datetime,\nimages                    varchar(400),\ndescription               varchar(2000),\ncomment                   varchar(255),\nprice                     Decimal(10,2),\noriginal_price            Decimal(10,2),\nstatus                    integer,\nconstraint pk_product primary key (id))\n;\n\ncreate table purchase (\nid                        bigint auto_increment not null,\nname                      varchar(255),\nref_user_id               bigint,\nuser_id                   bigint,\nstatus                    integer,\nlast_update_time          datetime,\ncreated_at                datetime,\nquantity                  varchar(255),\npids                      varchar(255),\namount                    Decimal(10,2),\nuse_vip_point             integer,\nvip_point_discount        Decimal(10,2),\nuse_balance               Decimal(18,8),\nbalance_discount          Decimal(10,2),\nship_name                 varchar(255),\nship_phone                varchar(255),\nship_province             varchar(255),\nship_city                 varchar(255),\nship_zone                 varchar(255),\nship_location             varchar(255),\nbuyer_message             varchar(255),\npay_return_code           varchar(255),\npay_return_msg            varchar(255),\npay_result_code           varchar(255),\npay_transition_id         varchar(255),\npay_amount                Decimal(18,8),\npay_time                  datetime,\npay_bank                  varchar(255),\npay_ref_order_no          varchar(255),\npay_sign                  varchar(255),\ndescription1              varchar(2000),\ndescription2              varchar(2000),\ncomment                   varchar(255),\nconstraint pk_purchase primary key (id))\n;\n\ncreate table red (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\nimages                    longtext,\nmoney                     Decimal(10,2),\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nconstraint pk_red primary key (id))\n;\n\ncreate table remind (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription               varchar(1000),\ncomment                   varchar(255),\nconstraint pk_remind primary key (id))\n;\n\ncreate table sale (\nid                        bigint auto_increment not null,\nshow_no                   varchar(255),\nname                      varchar(255),\nsold_number               integer,\nlast_update_time          datetime,\ncreated_at                datetime,\nend_time                  datetime,\nimages                    varchar(400),\ndescription               varchar(2000),\ncomment                   varchar(255),\nprice                     Decimal(10,2),\noriginal_price            Decimal(10,2),\nstatus                    integer,\nconstraint pk_sale primary key (id))\n;\n\ncreate table sms_info (\nid                        bigint auto_increment not null,\nname                      varchar(255),\nphone                     varchar(255),\ncheck_code                varchar(255),\nsend_xml                  varchar(2000),\nreturn_table              varchar(255),\nreceive_xml               varchar(2000),\ncode                      varchar(255),\nreturn_msg                varchar(255),\nlast_update_time          datetime,\ncreated_at                datetime,\ncomment                   varchar(255),\nconstraint pk_sms_info primary key (id))\n;\n\ncreate table staff (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nconstraint pk_staff primary key (id))\n;\n\ncreate table talk_skill (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nanswer                    varchar(255),\nstatus                    integer,\nimages                    longtext,\nsmall_images              longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription               varchar(1000),\ncomment                   varchar(255),\nconstraint pk_talk_skill primary key (id))\n;\n\ncreate table ticket (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\ndescription               varchar(1000),\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ncomment                   varchar(255),\nref_user_id               bigint,\nuser_id                   bigint,\nref_staff_id              bigint,\nstaff_id                  bigint,\nconstraint pk_ticket primary key (id))\n;\n\ncreate table user (\nid                        bigint auto_increment not null,\nname                      varchar(255),\nthird_id                  varchar(255),\nlogin_name                varchar(255) not null,\nemail                     varchar(255),\nis_email_verified         tinyint(1) default 0,\nemail_key                 varchar(255),\nemail_over_time           datetime,\npassword                  varchar(255) not null,\nhead_image                varchar(255),\nimages                    longtext,\nsex_enum                  integer,\nphone                     varchar(255),\ncard_number               varchar(255),\ncountry                   varchar(255),\nprovince                  varchar(255),\ncity                      varchar(255),\nzone                      varchar(255),\naddress                   varchar(255),\nbirth                     datetime,\nlast_update_time          datetime,\ncreated_at                datetime,\nlast_login_ip             varchar(255),\nlast_login_time           datetime,\nlast_login_ip_area        varchar(255),\nstatus                    integer,\nuser_role_enum            integer,\ncomment                   varchar(1000),\nconstraint pk_user primary key (id))\n;\n\ncreate table visit (\nid                        bigint auto_increment not null,\nname                      varchar(255) not null,\nstatus                    integer,\ntype_enum                 integer,\nimages                    longtext,\nlast_update_time          datetime,\ncreated_at                datetime,\ndescription1              varchar(1000),\ndescription2              varchar(1000),\ncomment                   varchar(255),\nref_user_id               bigint,\nuser_id                   bigint,\nconstraint pk_visit primary key (id))\n;\n\n\ncreate table pop_user (\npop_id                         bigint not null,\nuser_id                        bigint not null,\nconstraint pk_pop_user primary key (pop_id, user_id))\n;\n\ncreate table product_purchase (\nproduct_id                     bigint not null,\npurchase_id                    bigint not null,\nconstraint pk_product_purchase primary key (product_id, purchase_id))\n;\n\ncreate table product_sale (\nproduct_id                     bigint not null,\nsale_id                        bigint not null,\nconstraint pk_product_sale primary key (product_id, sale_id))\n;\n\ncreate table purchase_product (\npurchase_id                    bigint not null,\nproduct_id                     bigint not null,\nconstraint pk_purchase_product primary key (purchase_id, product_id))\n;\n\ncreate table red_user (\nred_id                         bigint not null,\nuser_id                        bigint not null,\nconstraint pk_red_user primary key (red_id, user_id))\n;\n\ncreate table remind_user (\nremind_id                      bigint not null,\nuser_id                        bigint not null,\nconstraint pk_remind_user primary key (remind_id, user_id))\n;\n\ncreate table sale_product (\nsale_id                        bigint not null,\nproduct_id                     bigint not null,\nconstraint pk_sale_product primary key (sale_id, product_id))\n;\n\ncreate table sale_user (\nsale_id                        bigint not null,\nuser_id                        bigint not null,\nconstraint pk_sale_user primary key (sale_id, user_id))\n;\n\ncreate table staff_user (\nstaff_id                       bigint not null,\nuser_id                        bigint not null,\nconstraint pk_staff_user primary key (staff_id, user_id))\n;\n\ncreate table staff_visit (\nstaff_id                       bigint not null,\nvisit_id                       bigint not null,\nconstraint pk_staff_visit primary key (staff_id, visit_id))\n;\n\ncreate table user_pop (\nuser_id                        bigint not null,\npop_id                         bigint not null,\nconstraint pk_user_pop primary key (user_id, pop_id))\n;\n\ncreate table user_red (\nuser_id                        bigint not null,\nred_id                         bigint not null,\nconstraint pk_user_red primary key (user_id, red_id))\n;\n\ncreate table user_remind (\nuser_id                        bigint not null,\nremind_id                      bigint not null,\nconstraint pk_user_remind primary key (user_id, remind_id))\n;\n\ncreate table user_staff (\nuser_id                        bigint not null,\nstaff_id                       bigint not null,\nconstraint pk_user_staff primary key (user_id, staff_id))\n;\n\ncreate table user_sale (\nuser_id                        bigint not null,\nsale_id                        bigint not null,\nconstraint pk_user_sale primary key (user_id, sale_id))\n;\n\ncreate table visit_staff (\nvisit_id                       bigint not null,\nstaff_id                       bigint not null,\nconstraint pk_visit_staff primary key (visit_id, staff_id))\n;\nalter table car add constraint fk_car_user_1 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_car_user_1 on car (user_id);\nalter table complain add constraint fk_complain_user_2 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_complain_user_2 on complain (user_id);\nalter table feedback add constraint fk_feedback_user_3 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_feedback_user_3 on feedback (user_id);\nalter table fix add constraint fk_fix_car_4 foreign key (car_id) references car (id) on delete restrict on update restrict;\ncreate index ix_fix_car_4 on fix (car_id);\nalter table purchase add constraint fk_purchase_user_5 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_purchase_user_5 on purchase (user_id);\nalter table ticket add constraint fk_ticket_user_6 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_ticket_user_6 on ticket (user_id);\nalter table ticket add constraint fk_ticket_staff_7 foreign key (staff_id) references staff (id) on delete restrict on update restrict;\ncreate index ix_ticket_staff_7 on ticket (staff_id);\nalter table visit add constraint fk_visit_user_8 foreign key (user_id) references user (id) on delete restrict on update restrict;\ncreate index ix_visit_user_8 on visit (user_id);\n\n\n\nalter table pop_user add constraint fk_pop_user_pop_01 foreign key (pop_id) references pop (id) on delete restrict on update restrict;\n\nalter table pop_user add constraint fk_pop_user_user_02 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table product_purchase add constraint fk_product_purchase_product_01 foreign key (product_id) references product (id) on delete restrict on update restrict;\n\nalter table product_purchase add constraint fk_product_purchase_purchase_02 foreign key (purchase_id) references purchase (id) on delete restrict on update restrict;\n\nalter table product_sale add constraint fk_product_sale_product_01 foreign key (product_id) references product (id) on delete restrict on update restrict;\n\nalter table product_sale add constraint fk_product_sale_sale_02 foreign key (sale_id) references sale (id) on delete restrict on update restrict;\n\nalter table purchase_product add constraint fk_purchase_product_purchase_01 foreign key (purchase_id) references purchase (id) on delete restrict on update restrict;\n\nalter table purchase_product add constraint fk_purchase_product_product_02 foreign key (product_id) references product (id) on delete restrict on update restrict;\n\nalter table red_user add constraint fk_red_user_red_01 foreign key (red_id) references red (id) on delete restrict on update restrict;\n\nalter table red_user add constraint fk_red_user_user_02 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table remind_user add constraint fk_remind_user_remind_01 foreign key (remind_id) references remind (id) on delete restrict on update restrict;\n\nalter table remind_user add constraint fk_remind_user_user_02 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table sale_product add constraint fk_sale_product_sale_01 foreign key (sale_id) references sale (id) on delete restrict on update restrict;\n\nalter table sale_product add constraint fk_sale_product_product_02 foreign key (product_id) references product (id) on delete restrict on update restrict;\n\nalter table sale_user add constraint fk_sale_user_sale_01 foreign key (sale_id) references sale (id) on delete restrict on update restrict;\n\nalter table sale_user add constraint fk_sale_user_user_02 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table staff_user add constraint fk_staff_user_staff_01 foreign key (staff_id) references staff (id) on delete restrict on update restrict;\n\nalter table staff_user add constraint fk_staff_user_user_02 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table staff_visit add constraint fk_staff_visit_staff_01 foreign key (staff_id) references staff (id) on delete restrict on update restrict;\n\nalter table staff_visit add constraint fk_staff_visit_visit_02 foreign key (visit_id) references visit (id) on delete restrict on update restrict;\n\nalter table user_pop add constraint fk_user_pop_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table user_pop add constraint fk_user_pop_pop_02 foreign key (pop_id) references pop (id) on delete restrict on update restrict;\n\nalter table user_red add constraint fk_user_red_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table user_red add constraint fk_user_red_red_02 foreign key (red_id) references red (id) on delete restrict on update restrict;\n\nalter table user_remind add constraint fk_user_remind_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table user_remind add constraint fk_user_remind_remind_02 foreign key (remind_id) references remind (id) on delete restrict on update restrict;\n\nalter table user_staff add constraint fk_user_staff_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table user_staff add constraint fk_user_staff_staff_02 foreign key (staff_id) references staff (id) on delete restrict on update restrict;\n\nalter table user_sale add constraint fk_user_sale_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;\n\nalter table user_sale add constraint fk_user_sale_sale_02 foreign key (sale_id) references sale (id) on delete restrict on update restrict;\n\nalter table visit_staff add constraint fk_visit_staff_visit_01 foreign key (visit_id) references visit (id) on delete restrict on update restrict;\n\nalter table visit_staff add constraint fk_visit_staff_staff_02 foreign key (staff_id) references staff (id) on delete restrict on update restrict;','SET FOREIGN_KEY_CHECKS=0;\n\ndrop table admin;\n\ndrop table admin_journal;\n\ndrop table car;\n\ndrop table complain;\n\ndrop table config;\n\ndrop table feedback;\n\ndrop table fix;\n\ndrop table info;\n\ndrop table pop;\n\ndrop table pop_user;\n\ndrop table product;\n\ndrop table product_purchase;\n\ndrop table product_sale;\n\ndrop table purchase;\n\ndrop table purchase_product;\n\ndrop table red;\n\ndrop table red_user;\n\ndrop table remind;\n\ndrop table remind_user;\n\ndrop table sale;\n\ndrop table sale_product;\n\ndrop table sale_user;\n\ndrop table sms_info;\n\ndrop table staff;\n\ndrop table staff_user;\n\ndrop table staff_visit;\n\ndrop table talk_skill;\n\ndrop table ticket;\n\ndrop table user;\n\ndrop table user_pop;\n\ndrop table user_red;\n\ndrop table user_remind;\n\ndrop table user_staff;\n\ndrop table user_sale;\n\ndrop table visit;\n\ndrop table visit_staff;\n\nSET FOREIGN_KEY_CHECKS=1;','applied','');

#
# Structure for table "pop"
#

DROP TABLE IF EXISTS `pop`;
CREATE TABLE `pop` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `classify` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `small_images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "pop"
#

INSERT INTO `pop` VALUES (1,'pop_1','0',0,'0','0',NULL,'2020-03-30 12:30:13','0','0','0'),(2,'pop_2','1',1,'1','1',NULL,'2020-03-30 12:30:13','1','1','1'),(3,'pop_3','2',2,'2','2',NULL,'2020-03-30 12:30:13','2','2','2');

#
# Structure for table "product"
#

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `show_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sold_number` int(11) DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `images` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "product"
#

INSERT INTO `product` VALUES (1,'0','product_1',0,'0',NULL,'2020-03-30 12:30:13','0','0','0',0.00,0.00,0),(2,'1','product_2',1,'1',NULL,'2020-03-30 12:30:13','1','1','1',1.00,1.00,1),(3,'2','product_3',2,'2',NULL,'2020-03-30 12:30:13','2','2','2',2.00,2.00,2);

#
# Structure for table "red"
#

DROP TABLE IF EXISTS `red`;
CREATE TABLE `red` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `money` decimal(10,2) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "red"
#

INSERT INTO `red` VALUES (1,'red_1',0,'0',0.00,NULL,'2020-03-30 12:30:13','0','0','0'),(2,'red_2',1,'1',1.00,NULL,'2020-03-30 12:30:13','1','1','1'),(3,'red_3',2,'2',2.00,NULL,'2020-03-30 12:30:13','2','2','2');

#
# Structure for table "remind"
#

DROP TABLE IF EXISTS `remind`;
CREATE TABLE `remind` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "remind"
#

INSERT INTO `remind` VALUES (1,'remind_1',0,NULL,'2020-03-30 12:30:13','0','0'),(2,'remind_2',1,NULL,'2020-03-30 12:30:13','1','1'),(3,'remind_3',2,NULL,'2020-03-30 12:30:13','2','2');

#
# Structure for table "sale"
#

DROP TABLE IF EXISTS `sale`;
CREATE TABLE `sale` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `show_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sold_number` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `images` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "sale"
#

INSERT INTO `sale` VALUES (1,'0','sale_1',0,NULL,'2020-03-30 12:30:13',NULL,'0','0','0',0.00,0.00,0),(2,'1','sale_2',1,NULL,'2020-03-30 12:30:13',NULL,'1','1','1',1.00,1.00,1),(3,'2','sale_3',2,NULL,'2020-03-30 12:30:13',NULL,'2','2','2',2.00,2.00,2);

#
# Structure for table "product_sale"
#

DROP TABLE IF EXISTS `product_sale`;
CREATE TABLE `product_sale` (
  `product_id` bigint(20) NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  PRIMARY KEY (`product_id`,`sale_id`),
  KEY `fk_product_sale_sale_02` (`sale_id`),
  CONSTRAINT `fk_product_sale_sale_02` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`),
  CONSTRAINT `fk_product_sale_product_01` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "product_sale"
#


#
# Structure for table "sale_product"
#

DROP TABLE IF EXISTS `sale_product`;
CREATE TABLE `sale_product` (
  `sale_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`sale_id`,`product_id`),
  KEY `fk_sale_product_product_02` (`product_id`),
  CONSTRAINT `fk_sale_product_product_02` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_sale_product_sale_01` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "sale_product"
#


#
# Structure for table "sms_info"
#

DROP TABLE IF EXISTS `sms_info`;
CREATE TABLE `sms_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `check_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_xml` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `return_table` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `receive_xml` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `return_msg` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "sms_info"
#

INSERT INTO `sms_info` VALUES (1,'smsInfo_1','0','0','0','0','0','0','0',NULL,'2020-03-30 12:30:13','0'),(2,'smsInfo_2','1','1','1','1','1','1','1',NULL,'2020-03-30 12:30:13','1'),(3,'smsInfo_3','2','2','2','2','2','2','2',NULL,'2020-03-30 12:30:13','2');

#
# Structure for table "staff"
#

DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "staff"
#

INSERT INTO `staff` VALUES (1,'staff_1',0,'0',NULL,'2020-03-30 12:30:13','0','0','0'),(2,'staff_2',1,'1',NULL,'2020-03-30 12:30:13','1','1','1'),(3,'staff_3',2,'2',NULL,'2020-03-30 12:30:13','2','2','2');

#
# Structure for table "talk_skill"
#

DROP TABLE IF EXISTS `talk_skill`;
CREATE TABLE `talk_skill` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `answer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `small_images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "talk_skill"
#

INSERT INTO `talk_skill` VALUES (1,'talkSkill_1','0',0,'0','0',NULL,'2020-03-30 12:30:13','0','0'),(2,'talkSkill_2','1',1,'1','1',NULL,'2020-03-30 12:30:13','1','1'),(3,'talkSkill_3','2',2,'2','2',NULL,'2020-03-30 12:30:13','2','2');

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `third_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `login_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_email_verified` tinyint(1) DEFAULT '0',
  `email_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_over_time` datetime DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `head_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `sex_enum` int(11) DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `last_login_ip_area` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `user_role_enum` int(11) DEFAULT NULL,
  `comment` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'user_1','0','0','0',1,'0',NULL,'e10adc3949ba59abbe56e057f20f883e','0','0',0,'0','0','0','0','0','0','0',NULL,NULL,'2020-03-30 12:30:13','0',NULL,'0',0,0,'0'),(2,'user_2','1','1','1',0,'1',NULL,'e10adc3949ba59abbe56e057f20f883e','1','1',1,'1','1','1','1','1','1','1',NULL,NULL,'2020-03-30 12:30:13','1',NULL,'1',0,1,'1'),(3,'user_3','2','2','2',1,'2',NULL,'e10adc3949ba59abbe56e057f20f883e','2','2',2,'2','2','2','2','2','2','2',NULL,NULL,'2020-03-30 12:30:13','2',NULL,'2',0,2,'2');

#
# Structure for table "ticket"
#

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `ref_staff_id` bigint(20) DEFAULT NULL,
  `staff_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_ticket_user_6` (`user_id`),
  KEY `ix_ticket_staff_7` (`staff_id`),
  CONSTRAINT `fk_ticket_staff_7` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `fk_ticket_user_6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "ticket"
#

INSERT INTO `ticket` VALUES (1,'ticket_1',0,'0','0',NULL,'2020-03-30 12:30:13','0',0,NULL,0,NULL),(2,'ticket_2',1,'1','1',NULL,'2020-03-30 12:30:13','1',0,NULL,0,NULL),(3,'ticket_3',2,'2','2',NULL,'2020-03-30 12:30:13','2',0,NULL,0,NULL);

#
# Structure for table "staff_user"
#

DROP TABLE IF EXISTS `staff_user`;
CREATE TABLE `staff_user` (
  `staff_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`staff_id`,`user_id`),
  KEY `fk_staff_user_user_02` (`user_id`),
  CONSTRAINT `fk_staff_user_user_02` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_staff_user_staff_01` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "staff_user"
#


#
# Structure for table "sale_user"
#

DROP TABLE IF EXISTS `sale_user`;
CREATE TABLE `sale_user` (
  `sale_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`sale_id`,`user_id`),
  KEY `fk_sale_user_user_02` (`user_id`),
  CONSTRAINT `fk_sale_user_user_02` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_sale_user_sale_01` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "sale_user"
#


#
# Structure for table "remind_user"
#

DROP TABLE IF EXISTS `remind_user`;
CREATE TABLE `remind_user` (
  `remind_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`remind_id`,`user_id`),
  KEY `fk_remind_user_user_02` (`user_id`),
  CONSTRAINT `fk_remind_user_user_02` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_remind_user_remind_01` FOREIGN KEY (`remind_id`) REFERENCES `remind` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "remind_user"
#


#
# Structure for table "red_user"
#

DROP TABLE IF EXISTS `red_user`;
CREATE TABLE `red_user` (
  `red_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`red_id`,`user_id`),
  KEY `fk_red_user_user_02` (`user_id`),
  CONSTRAINT `fk_red_user_user_02` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_red_user_red_01` FOREIGN KEY (`red_id`) REFERENCES `red` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "red_user"
#


#
# Structure for table "purchase"
#

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `quantity` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pids` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `use_vip_point` int(11) DEFAULT NULL,
  `vip_point_discount` decimal(10,2) DEFAULT NULL,
  `use_balance` decimal(18,8) DEFAULT NULL,
  `balance_discount` decimal(10,2) DEFAULT NULL,
  `ship_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ship_phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ship_province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ship_city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ship_zone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ship_location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyer_message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_return_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_return_msg` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_result_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_transition_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_amount` decimal(18,8) DEFAULT NULL,
  `pay_time` datetime DEFAULT NULL,
  `pay_bank` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_ref_order_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pay_sign` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description1` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_purchase_user_5` (`user_id`),
  CONSTRAINT `fk_purchase_user_5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "purchase"
#

INSERT INTO `purchase` VALUES (1,'purchase_1',0,NULL,0,NULL,'2020-03-30 12:30:13','0','0',0.00,0,0.00,0.00000000,0.00,'0','0','0','0','0','0','0','0','0','0','0',0.00000000,NULL,'0',NULL,'0','0','0','0'),(2,'purchase_2',0,NULL,1,NULL,'2020-03-30 12:30:13','1','1',1.00,1,1.00,1.00000000,1.00,'1','1','1','1','1','1','1','1','1','1','1',1.00000000,NULL,'1',NULL,'1','1','1','1'),(3,'purchase_3',0,NULL,2,NULL,'2020-03-30 12:30:13','2','2',2.00,2,2.00,2.00000000,2.00,'2','2','2','2','2','2','2','2','2','2','2',2.00000000,NULL,'2',NULL,'2','2','2','2');

#
# Structure for table "purchase_product"
#

DROP TABLE IF EXISTS `purchase_product`;
CREATE TABLE `purchase_product` (
  `purchase_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`purchase_id`,`product_id`),
  KEY `fk_purchase_product_product_02` (`product_id`),
  CONSTRAINT `fk_purchase_product_product_02` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_purchase_product_purchase_01` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "purchase_product"
#


#
# Structure for table "product_purchase"
#

DROP TABLE IF EXISTS `product_purchase`;
CREATE TABLE `product_purchase` (
  `product_id` bigint(20) NOT NULL,
  `purchase_id` bigint(20) NOT NULL,
  PRIMARY KEY (`product_id`,`purchase_id`),
  KEY `fk_product_purchase_purchase_02` (`purchase_id`),
  CONSTRAINT `fk_product_purchase_purchase_02` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `fk_product_purchase_product_01` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "product_purchase"
#


#
# Structure for table "pop_user"
#

DROP TABLE IF EXISTS `pop_user`;
CREATE TABLE `pop_user` (
  `pop_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`pop_id`,`user_id`),
  KEY `fk_pop_user_user_02` (`user_id`),
  CONSTRAINT `fk_pop_user_user_02` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_pop_user_pop_01` FOREIGN KEY (`pop_id`) REFERENCES `pop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "pop_user"
#


#
# Structure for table "feedback"
#

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_feedback_user_3` (`user_id`),
  CONSTRAINT `fk_feedback_user_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "feedback"
#

INSERT INTO `feedback` VALUES (1,'feedback_1',0,'0',0,NULL,'0',NULL,'2020-03-30 12:30:13','0'),(2,'feedback_2',1,'1',0,NULL,'1',NULL,'2020-03-30 12:30:13','1'),(3,'feedback_3',2,'2',0,NULL,'2',NULL,'2020-03-30 12:30:13','2');

#
# Structure for table "complain"
#

DROP TABLE IF EXISTS `complain`;
CREATE TABLE `complain` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_complain_user_2` (`user_id`),
  CONSTRAINT `fk_complain_user_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "complain"
#

INSERT INTO `complain` VALUES (1,'complain_1',0,'0',0,NULL,'0',NULL,'2020-03-30 12:30:13','0'),(2,'complain_2',1,'1',0,NULL,'1',NULL,'2020-03-30 12:30:13','1'),(3,'complain_3',2,'2',0,NULL,'2',NULL,'2020-03-30 12:30:13','2');

#
# Structure for table "car"
#

DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `classify` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `is_vip` tinyint(1) DEFAULT '0',
  `leave_record_enum` int(11) DEFAULT NULL,
  `leave_reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `small_images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_car_user_1` (`user_id`),
  CONSTRAINT `fk_car_user_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "car"
#

INSERT INTO `car` VALUES (1,'car_1','0',0,1,0,'0','0','0',NULL,'2020-03-30 12:30:13','0','0','0',0,NULL),(2,'car_2','1',1,0,1,'1','1','1',NULL,'2020-03-30 12:30:13','1','1','1',0,NULL),(3,'car_3','2',2,1,2,'2','2','2',NULL,'2020-03-30 12:30:13','2','2','2',0,NULL);

#
# Structure for table "fix"
#

DROP TABLE IF EXISTS `fix`;
CREATE TABLE `fix` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `ref_car_id` bigint(20) DEFAULT NULL,
  `car_id` bigint(20) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_fix_car_4` (`car_id`),
  CONSTRAINT `fk_fix_car_4` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "fix"
#

INSERT INTO `fix` VALUES (1,'fix_1',0,0,NULL,'0',NULL,'2020-03-30 12:30:13','0','0','0'),(2,'fix_2',1,0,NULL,'1',NULL,'2020-03-30 12:30:13','1','1','1'),(3,'fix_3',2,0,NULL,'2',NULL,'2020-03-30 12:30:13','2','2','2');

#
# Structure for table "user_pop"
#

DROP TABLE IF EXISTS `user_pop`;
CREATE TABLE `user_pop` (
  `user_id` bigint(20) NOT NULL,
  `pop_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`pop_id`),
  KEY `fk_user_pop_pop_02` (`pop_id`),
  CONSTRAINT `fk_user_pop_pop_02` FOREIGN KEY (`pop_id`) REFERENCES `pop` (`id`),
  CONSTRAINT `fk_user_pop_user_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user_pop"
#


#
# Structure for table "user_red"
#

DROP TABLE IF EXISTS `user_red`;
CREATE TABLE `user_red` (
  `user_id` bigint(20) NOT NULL,
  `red_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`red_id`),
  KEY `fk_user_red_red_02` (`red_id`),
  CONSTRAINT `fk_user_red_red_02` FOREIGN KEY (`red_id`) REFERENCES `red` (`id`),
  CONSTRAINT `fk_user_red_user_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user_red"
#


#
# Structure for table "user_remind"
#

DROP TABLE IF EXISTS `user_remind`;
CREATE TABLE `user_remind` (
  `user_id` bigint(20) NOT NULL,
  `remind_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`remind_id`),
  KEY `fk_user_remind_remind_02` (`remind_id`),
  CONSTRAINT `fk_user_remind_remind_02` FOREIGN KEY (`remind_id`) REFERENCES `remind` (`id`),
  CONSTRAINT `fk_user_remind_user_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user_remind"
#


#
# Structure for table "user_sale"
#

DROP TABLE IF EXISTS `user_sale`;
CREATE TABLE `user_sale` (
  `user_id` bigint(20) NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`sale_id`),
  KEY `fk_user_sale_sale_02` (`sale_id`),
  CONSTRAINT `fk_user_sale_sale_02` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`),
  CONSTRAINT `fk_user_sale_user_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user_sale"
#


#
# Structure for table "user_staff"
#

DROP TABLE IF EXISTS `user_staff`;
CREATE TABLE `user_staff` (
  `user_id` bigint(20) NOT NULL,
  `staff_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`staff_id`),
  KEY `fk_user_staff_staff_02` (`staff_id`),
  CONSTRAINT `fk_user_staff_staff_02` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `fk_user_staff_user_01` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user_staff"
#


#
# Structure for table "visit"
#

DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `type_enum` int(11) DEFAULT NULL,
  `images` longtext COLLATE utf8_unicode_ci,
  `last_update_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description1` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description2` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ref_user_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_visit_user_8` (`user_id`),
  CONSTRAINT `fk_visit_user_8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "visit"
#

INSERT INTO `visit` VALUES (1,'visit_1',0,0,'0',NULL,'2020-03-30 12:30:13','0','0','0',0,NULL),(2,'visit_2',1,1,'1',NULL,'2020-03-30 12:30:13','1','1','1',0,NULL),(3,'visit_3',2,2,'2',NULL,'2020-03-30 12:30:13','2','2','2',0,NULL);

#
# Structure for table "staff_visit"
#

DROP TABLE IF EXISTS `staff_visit`;
CREATE TABLE `staff_visit` (
  `staff_id` bigint(20) NOT NULL,
  `visit_id` bigint(20) NOT NULL,
  PRIMARY KEY (`staff_id`,`visit_id`),
  KEY `fk_staff_visit_visit_02` (`visit_id`),
  CONSTRAINT `fk_staff_visit_visit_02` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`),
  CONSTRAINT `fk_staff_visit_staff_01` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "staff_visit"
#


#
# Structure for table "visit_staff"
#

DROP TABLE IF EXISTS `visit_staff`;
CREATE TABLE `visit_staff` (
  `visit_id` bigint(20) NOT NULL,
  `staff_id` bigint(20) NOT NULL,
  PRIMARY KEY (`visit_id`,`staff_id`),
  KEY `fk_visit_staff_staff_02` (`staff_id`),
  CONSTRAINT `fk_visit_staff_staff_02` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `fk_visit_staff_visit_01` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "visit_staff"
#

