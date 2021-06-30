/*
 Navicat Premium Data Transfer

 Source Server         : glxt
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : baseform

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 30/06/2021 16:42:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `application_dep_platform` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用部署平台',
  `application_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用类型',
  `application_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '应用标签',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `apply_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `application_use` int DEFAULT '1' COMMENT '是否启用',
  `is_interactive` int DEFAULT '1' COMMENT '是否互动应用',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `platform_app` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用名称',
  `platform_app_code` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用代码',
  `platform_app_version` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用版本',
  `platform_business` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用平台',
  `platform_business_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用平台label',
  `application_dep_platform_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用部署平台label',
  `application_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用类型label',
  `application_label_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '应用标签label',
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of application
-- ----------------------------
BEGIN;
INSERT INTO `application` VALUES (18, 'platform-ali', 'IOS', 'pull_new', NULL, NULL, 1, 1, 1, '2021-06-24 11:34:30', '2021-06-29 17:39:26', NULL, NULL, 'www', 'wwwww', '1', 'TB', '淘宝', '客户运营平台-阿里版', 'IOS', '拉新');
INSERT INTO `application` VALUES (19, 'platform-ali', 'IOS', '', NULL, NULL, 1, 1, 1, '2021-06-30 15:50:37', '2021-06-30 15:51:08', NULL, NULL, '222', 'wwwww', '1', 'TB', '淘宝', '客户运营平台-阿里版', 'IOS', NULL);
COMMIT;

-- ----------------------------
-- Table structure for applicationIndicator
-- ----------------------------
DROP TABLE IF EXISTS `applicationIndicator`;
CREATE TABLE `applicationIndicator` (
  `application_id` int NOT NULL,
  `indicator_id` int NOT NULL,
  PRIMARY KEY (`application_id`,`indicator_id`),
  UNIQUE KEY `applicationIndicator_indicator_id_application_id_unique` (`application_id`,`indicator_id`),
  KEY `indicator_id` (`indicator_id`),
  CONSTRAINT `applicationindicator_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `applicationindicator_ibfk_2` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of applicationIndicator
-- ----------------------------
BEGIN;
INSERT INTO `applicationIndicator` VALUES (19, 3);
COMMIT;

-- ----------------------------
-- Table structure for attribute
-- ----------------------------
DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `attribute_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '属性名称',
  `data_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '数据类型',
  `desc` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '单位格式说明',
  `attribute_source` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '属性来源',
  `attribute_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '属性标签',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `enum_data` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `attribute_code` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '属性代码',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `is_common` int DEFAULT '1' COMMENT '1公共属性 0自定义属性',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `data_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '数据类型label',
  `attribute_label_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '属性标签label',
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of attribute
-- ----------------------------
BEGIN;
INSERT INTO `attribute` VALUES (1, '返回状态', 'Boolean', 'Ture/False', '上报值本身', '全部通用', NULL, NULL, 1, '[{\"value\":\"0\",\"label\":\"成功\"},{\"value\":\"!0\",\"label\":\"失败\"}]', 'is_success', NULL, NULL, 1, 'Jiangxinyu', 'Boolean', NULL);
INSERT INTO `attribute` VALUES (2, '商品ID', 'String', '商品ID', '上报值本身', '全部通用', '商品ID与业务库表中一致', NULL, 1, NULL, 'goods_id', NULL, NULL, 1, 'Jiangxinyu', 'String', NULL);
INSERT INTO `attribute` VALUES (3, '会员状态', 'Boolean', 'Ture/False', '上报值本身', '全部通用', NULL, NULL, 1, NULL, 'is_member', NULL, NULL, 1, 'Jiangxinyu', 'Boolean', NULL);
COMMIT;

-- ----------------------------
-- Table structure for basicData
-- ----------------------------
DROP TABLE IF EXISTS `basicData`;
CREATE TABLE `basicData` (
  `fid` varchar(40) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(20) DEFAULT NULL,
  `value` varchar(40) DEFAULT NULL,
  `state` int DEFAULT '1',
  `bz` varchar(255) DEFAULT NULL,
  `label` varchar(20) DEFAULT NULL,
  `is_lower` int DEFAULT '1',
  `children` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of basicData
-- ----------------------------
BEGIN;
INSERT INTO `basicData` VALUES ('0', 90, '一级', 'indicator_label', 1, NULL, '指标标签', 0, NULL);
INSERT INTO `basicData` VALUES ('indicator_label', 91, '指标标签', 'Indicator_obj', 1, NULL, '指标分析对象', 0, NULL);
INSERT INTO `basicData` VALUES ('Indicator_obj', 92, '指标分析对象', 'parti_user', 1, NULL, '参与用户', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_obj', 96, '指标分析对象', 'members', 1, NULL, '会员', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_obj', 97, '指标分析对象', 'invite_user', 1, NULL, '被邀用户', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_obj', 98, '指标分析对象', 'access_user', 1, NULL, '访问用户', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_label', 99, '指标标签', 'Indicator_stage', 1, NULL, '指标所属阶段', 0, NULL);
INSERT INTO `basicData` VALUES ('Indicator_stage', 100, '指标所属阶段', 'cognitive', 1, NULL, '认知', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_stage', 101, '指标所属阶段', 'interest', 1, NULL, '兴趣', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_stage', 102, '指标所属阶段', 'conversion', 1, NULL, '转化', 1, NULL);
INSERT INTO `basicData` VALUES ('Indicator_stage', 103, '指标所属阶段', 'loyalty', 1, NULL, '忠诚', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 104, '一级', 'event_trigger_mode', 1, NULL, '触发类型', 0, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 105, '触发类型', 'open', 1, NULL, 'open', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 106, '触发类型', 'click', 1, NULL, 'click', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 107, '触发类型', 'slide', 1, NULL, 'slide', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 108, '触发类型', 'callback', 1, NULL, 'callback', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 109, '触发类型', 'jump', 1, NULL, 'jump', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 110, '触发类型', 'play', 1, NULL, 'play', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 111, '一级', 'event_label', 1, NULL, '事件标签', 0, NULL);
INSERT INTO `basicData` VALUES ('event_label', 112, '事件标签', 'general_label', 1, NULL, '事件通用性', 0, NULL);
INSERT INTO `basicData` VALUES ('general_label', 113, '事件通用性', 'all_general', 1, NULL, '全部通用', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 114, '事件通用性', 'interactive_general', 1, NULL, '互动通用', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 115, '事件通用性', 'policy_general', 1, NULL, '天策通用', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 116, '事件通用性', 'crm_general', 1, NULL, 'CRM通用', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 117, '事件通用性', 'interactive_custom', 1, NULL, '互动定制', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 118, '事件通用性', 'policy_custom', 1, NULL, '天策定制', 1, NULL);
INSERT INTO `basicData` VALUES ('general_label', 119, '事件通用性', 'crm_custom', 1, NULL, 'CRM定制', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 133, '一级', 'attribute_label', 1, NULL, '属性标签', 0, NULL);
INSERT INTO `basicData` VALUES ('attribute_label', 134, '属性标签', 'attribute_general', 1, NULL, '属性通用性', 0, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 135, '属性通用性', 'all_genarel', 1, NULL, '全部通用', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 136, '属性通用性', 'active_general', 1, NULL, '互动通用', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 137, '属性通用性', 'policy_general', 1, NULL, '天策通用', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 138, '属性通用性', 'crm_general', 1, NULL, 'CRM通用', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 139, '属性通用性', 'active_custom', 1, NULL, '互动定制', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 140, '属性通用性', 'policy_custom', 1, NULL, '天策定制', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_general', 141, '属性通用性', 'crm_custom', 1, NULL, 'CRM定制', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_label', 142, '属性标签', 'attribute_obj', 1, NULL, '属性对象', 0, NULL);
INSERT INTO `basicData` VALUES ('attribute_obj', 143, '属性对象', 'member', 1, NULL, '会员', 1, NULL);
INSERT INTO `basicData` VALUES ('attribute_obj', 144, '属性对象', 'brand', 1, NULL, '品牌', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 145, '一级', 'app_label', 1, NULL, '应用标签', 0, NULL);
INSERT INTO `basicData` VALUES ('app_label', 146, '应用标签', 'app_value', 1, NULL, '互动应用价值', 0, NULL);
INSERT INTO `basicData` VALUES ('app_value', 147, '互动应用价值', 'pull_new', 1, NULL, '拉新', 1, NULL);
INSERT INTO `basicData` VALUES ('app_value', 148, '互动应用价值', 'promote', 1, NULL, '促活', 1, NULL);
INSERT INTO `basicData` VALUES ('app_value', 149, '互动应用价值', 'conversion', 1, NULL, '转化', 1, NULL);
INSERT INTO `basicData` VALUES ('app_value', 150, '互动应用价值', 'purchase', 1, NULL, '复购', 1, NULL);
INSERT INTO `basicData` VALUES ('app_value', 151, '互动应用价值', 'spread\n\nspread', 1, NULL, '传播', 1, NULL);
INSERT INTO `basicData` VALUES ('app_label', 152, '应用标签', 'app_type', 1, NULL, '互动应用类型', 0, NULL);
INSERT INTO `basicData` VALUES ('app_type', 153, '互动应用类型', 'active_draw', 1, NULL, '活动抽奖', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 154, '互动应用类型', 'fission_drainage', 1, NULL, '裂变引流', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 155, '互动应用类型', 'commercial_promotion', 1, NULL, '商业促销', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 156, '互动应用类型', 'long_active', 1, NULL, '长期活动', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 157, '互动应用类型', 'voting\n\nvoting', 1, NULL, '投票活动', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 158, '互动应用类型', 'solving', 1, NULL, '答题活动', 1, NULL);
INSERT INTO `basicData` VALUES ('app_type', 159, '互动应用类型', 'living', 1, NULL, '现场活动', 1, NULL);
INSERT INTO `basicData` VALUES ('app_label', 160, '应用标签', 'promote_stage', 1, NULL, '大促阶段', 0, NULL);
INSERT INTO `basicData` VALUES ('promote_stage', 161, '大促阶段', 'water_storage', 1, NULL, '蓄水', 1, NULL);
INSERT INTO `basicData` VALUES ('promote_stage', 162, '大促阶段', 'first_wave', 1, NULL, '第一波', 1, NULL);
INSERT INTO `basicData` VALUES ('promote_stage', 163, '大促阶段', 'second_wave', 1, NULL, '第二波', 1, NULL);
INSERT INTO `basicData` VALUES ('app_label', 164, '应用标签', 'business', 1, NULL, '所属业务线', 0, NULL);
INSERT INTO `basicData` VALUES ('business', 165, '所属业务线', 'business_platform', 1, NULL, '商家平台', 1, NULL);
INSERT INTO `basicData` VALUES ('business', 166, '所属业务线', 'data_srategy', 1, NULL, '数据策略', 1, NULL);
INSERT INTO `basicData` VALUES ('business', 167, '所属业务线', 'interactive_market', 1, NULL, '互动营销', 1, NULL);
INSERT INTO `basicData` VALUES ('business', 168, '所属业务线', 'customer_operation', 1, NULL, '客户运营', 1, NULL);
INSERT INTO `basicData` VALUES ('app_label', 169, '应用标签', 'own_interaction', 1, NULL, '所属互动', 0, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 170, '所属互动', 'sign_in', 1, NULL, '签到', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 171, '所属互动', 'Big wheel\n\nbig_wheel', 1, NULL, '大转盘', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 172, '所属互动', 'attente_store', 1, NULL, '关注店铺', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 173, '所属互动', 'collect_informate', 1, NULL, '收集会员信息', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 174, '所属互动', 'question_survey', 1, NULL, '问卷调查', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 175, '所属互动', 'tiger_machine', 1, NULL, '疯狂老虎机', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 176, '所属互动', 'line_up', 1, NULL, '排队', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 177, '所属互动', 'brand_around', 1, NULL, '品牌环游', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 178, '所属互动', 'card_draw', 1, NULL, '翻卡抽奖', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 179, '所属互动', 'wishing_bag', 1, NULL, '许愿购物袋', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 180, '所属互动', 'trial_activitie', 1, NULL, '试用活动', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 181, '所属互动', 'scratchable_latex', 1, NULL, '九宫格', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 182, '所属互动', 'acticle_interacte', 1, NULL, '文章互动', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 183, '所属互动', 'a_bulk', 1, NULL, '团购', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 184, '所属互动', 'solving_problem', 1, NULL, '答题有礼', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 185, '所属互动', 'fission_treasure', 1, NULL, '裂变宝', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 186, '所属互动', 'send_samples', 1, NULL, '派小样', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 187, '所属互动', 'sales_promotion', 1, NULL, '大促搭配购', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 188, '所属互动', 'shop_assistant', 1, NULL, '导购助手', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 189, '所属互动', 'exchange_active', 1, NULL, '兑换活动', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 190, '所属互动', 'purchase_fission', 1, NULL, '邀请预购裂变', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 191, '所属互动', 'registered_fission', 1, NULL, '邀请注册裂变', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 192, '所属互动', 'invite_sign', 1, NULL, '邀请好友签到', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 193, '所属互动', 'invite_registered', 1, NULL, '邀请好友注册', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 194, '所属互动', 'focus_shop', 1, NULL, '邀请好友关注店铺', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 195, '所属互动', 'invite_draw', 1, NULL, '邀请好友抽奖', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 196, '所属互动', 'invite_perfect', 1, NULL, '邀请好友完善信息', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 197, '所属互动', 'share_sign', 1, NULL, '分享签到', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 198, '所属互动', 'share_registered', 1, NULL, '分享注册', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 199, '所属互动', 'share_focus', 1, NULL, '分享关注店铺', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 200, '所属互动', 'share_draw', 1, NULL, '分享抽奖', 1, NULL);
INSERT INTO `basicData` VALUES ('own_interaction', 201, '所属互动', 'share_collection', 1, NULL, '分享收集会员信息', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 204, '一级', 'platform_business', 1, NULL, '业务平台', 0, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 205, '业务平台', 'TB', 1, NULL, '淘宝', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 206, '业务平台', 'JD', 1, NULL, '京东', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 207, '业务平台', 'TM', 1, NULL, '天猫', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 208, '业务平台', 'WX', 1, NULL, '微信', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 209, '业务平台', 'JZONE', 1, NULL, '京微通', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 210, '业务平台', 'BD', 1, NULL, '百度', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 211, '业务平台', 'DY', 1, NULL, '抖音', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 212, '业务平台', 'YZ', 1, NULL, '有赞', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 213, '一级', 'application_dep_platform', 1, NULL, '应用部署平台', 0, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 214, '应用部署平台', 'platform-ali', 1, NULL, '客户运营平台-阿里版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 215, '应用部署平台', 'platform-jd', 1, NULL, ' 客户运营平台-京东版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 216, '应用部署平台', 'platform-jdy', 1, NULL, '客户运营平台-京东云版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 217, '应用部署平台', 'crm_enbrands', 1, NULL, 'Enbrands', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 218, '应用部署平台', 'crm_jd', 1, NULL, '智客', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 219, '应用部署平台', 'crm_dy', 1, NULL, '抖音', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 220, '应用部署平台', 'crm_sn', 1, NULL, '苏宁', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 221, '应用部署平台', 'crm_jzone', 1, NULL, '京微通', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 222, '一级', 'platform_system', 1, NULL, '应用类型', 0, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 223, '应用类型', 'IOS', 1, NULL, 'IOS', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 224, '应用类型', 'Android', 1, NULL, 'Android', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 225, '应用类型', 'PC', 1, NULL, 'PC', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 226, '应用类型', 'H5', 1, NULL, 'H5', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 227, '应用类型', 'program-wx', 1, NULL, '微信小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 228, '应用类型', 'program-dd', 1, NULL, '钉钉小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 229, '应用类型', 'program-zfb', 1, NULL, '支付宝小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 231, '一级', 'role', 1, NULL, '角色', 1, NULL);
INSERT INTO `basicData` VALUES ('role', 232, '角色', 'admin', 1, NULL, '管理员', 1, NULL);
INSERT INTO `basicData` VALUES ('role', 233, '角色', 'common', 1, NULL, '普通用户', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 234, '应用部署平台', 'crm_yz', 1, NULL, '有赞', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 235, '一级', 'indicator_type_level', 1, NULL, '指标类型', 0, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 236, '指标类型', 'frequency', 1, NULL, '次数', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 237, '指标类型', 'people', 1, NULL, '人数', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 238, '指标类型', 'retained', 1, NULL, '留存', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 239, '指标类型', 'time', 1, NULL, '时长', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 240, '指标类型', 'other', 1, NULL, '其他统计', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 241, '次数', 'cyhdcs', 1, NULL, '参与活动次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 242, '次数', 'pv', 1, NULL, 'PV', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 243, '次数', 'hdfxcs', 1, NULL, '活动分享次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 244, '次数', 'fcyqcs', 1, NULL, '发出邀请次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 245, '次数', 'jsyqcs', 1, NULL, '接受邀请次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 246, '次数', 'appdkcs', 1, NULL, 'APP打开次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 247, '次数', 'qtfwcs', 1, NULL, '其他访问次数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 248, '人数', 'uv', 1, NULL, 'UV', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 249, '人数', 'cyhdrs', 1, NULL, '参与活动人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 250, '人数', 'gzdprs', 1, NULL, '关注店铺人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 251, '人数', 'scdprs', 1, NULL, '收藏店铺人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 252, '人数', 'scsprs', 1, NULL, '收藏商品人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 253, '人数', 'jgsprs', 1, NULL, '加购商品人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 254, '人数', 'fcyqrs', 1, NULL, '发出邀请人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 255, '人数', 'jsyqrs', 1, NULL, '接受邀请人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 256, '人数', 'hdfxrs', 1, NULL, '活动分享人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 257, '人数', 'xzhyrs', 1, NULL, '新增会员人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 258, '人数', 'qtrs', 1, NULL, '其他人数', 1, NULL);
INSERT INTO `basicData` VALUES ('time', 259, '时长', 'ympjtlsj', 1, NULL, '页面平均停留时间', 1, NULL);
INSERT INTO `basicData` VALUES ('retained', 260, '留存', 'clrs', 1, NULL, '存留人数', 1, NULL);
INSERT INTO `basicData` VALUES ('other', 261, '其他统计', 'other', 1, NULL, '其他', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 262, '一级', 'data_type', 1, NULL, '数据类型', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 263, '数据类型', 'String', 1, NULL, 'String', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 264, '数据类型', 'Int', 1, NULL, 'Int', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 265, '数据类型', 'Double', 1, NULL, 'Double', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 266, '数据类型', 'Float', 1, NULL, 'Float', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 267, '数据类型', 'Boolean', 1, NULL, 'Boolean', 1, NULL);
COMMIT;

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件名称',
  `event_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件代码',
  `event_trigger_mode` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '触发类型',
  `trigger_time` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '触发时机',
  `event_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件标签',
  `note` text COLLATE utf8_bin COMMENT '备注',
  `general_attr` text COLLATE utf8_bin COMMENT '通用属性',
  `create_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `event_trigger_mode_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '触发类型label',
  `event_label_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件标签label',
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_name` (`event_name`),
  UNIQUE KEY `event_name_2` (`event_name`),
  UNIQUE KEY `event_name_3` (`event_name`),
  UNIQUE KEY `event_name_4` (`event_name`),
  UNIQUE KEY `event_name_5` (`event_name`),
  UNIQUE KEY `event_name_6` (`event_name`),
  UNIQUE KEY `event_name_7` (`event_name`),
  UNIQUE KEY `event_name_8` (`event_name`),
  UNIQUE KEY `event_name_9` (`event_name`),
  UNIQUE KEY `event_name_10` (`event_name`),
  UNIQUE KEY `event_name_11` (`event_name`),
  UNIQUE KEY `event_name_12` (`event_name`),
  UNIQUE KEY `event_name_13` (`event_name`),
  UNIQUE KEY `event_name_14` (`event_name`),
  UNIQUE KEY `event_name_15` (`event_name`),
  UNIQUE KEY `event_name_16` (`event_name`),
  UNIQUE KEY `event_name_17` (`event_name`),
  UNIQUE KEY `event_name_18` (`event_name`),
  UNIQUE KEY `event_name_19` (`event_name`),
  UNIQUE KEY `event_name_20` (`event_name`),
  UNIQUE KEY `event_name_21` (`event_name`),
  UNIQUE KEY `event_name_22` (`event_name`),
  UNIQUE KEY `event_name_23` (`event_name`),
  UNIQUE KEY `event_name_24` (`event_name`),
  UNIQUE KEY `event_name_25` (`event_name`),
  UNIQUE KEY `event_name_26` (`event_name`),
  UNIQUE KEY `event_name_27` (`event_name`),
  UNIQUE KEY `event_name_28` (`event_name`),
  UNIQUE KEY `event_name_29` (`event_name`),
  UNIQUE KEY `event_name_30` (`event_name`),
  UNIQUE KEY `event_name_31` (`event_name`),
  UNIQUE KEY `event_name_32` (`event_name`),
  UNIQUE KEY `event_name_33` (`event_name`),
  UNIQUE KEY `event_name_34` (`event_name`),
  UNIQUE KEY `event_name_35` (`event_name`),
  UNIQUE KEY `event_name_36` (`event_name`),
  UNIQUE KEY `event_name_37` (`event_name`),
  UNIQUE KEY `event_name_38` (`event_name`),
  UNIQUE KEY `event_name_39` (`event_name`),
  UNIQUE KEY `event_name_40` (`event_name`),
  UNIQUE KEY `event_name_41` (`event_name`),
  UNIQUE KEY `event_name_42` (`event_name`),
  UNIQUE KEY `event_name_43` (`event_name`),
  UNIQUE KEY `event_name_44` (`event_name`),
  UNIQUE KEY `event_name_45` (`event_name`),
  UNIQUE KEY `event_name_46` (`event_name`),
  UNIQUE KEY `event_name_47` (`event_name`),
  UNIQUE KEY `event_name_48` (`event_name`),
  UNIQUE KEY `event_name_49` (`event_name`),
  UNIQUE KEY `event_name_50` (`event_name`),
  UNIQUE KEY `event_name_51` (`event_name`),
  UNIQUE KEY `event_name_52` (`event_name`),
  UNIQUE KEY `event_name_53` (`event_name`),
  UNIQUE KEY `event_name_54` (`event_name`)
) ENGINE=InnoDB AUTO_INCREMENT=278 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of event
-- ----------------------------
BEGIN;
INSERT INTO `event` VALUES (1, '落地页统计', 'pageview', 'open', '访问落地页', 'all_general', '针对小程序而言，就是在小程序的onLoad周期函数中，上报该事件。\n\n针对vue而言，就是在vue项目中的mounted周期函数中，上报该事件。\n\n针对react项目而言，就是在react的componentDidMount中，上报该事件。\n\n针对react的Hook中，一般在一个依赖参数为空的 useEffect 的回调中，上报该事件。', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (2, '前往页面', 'page', 'jump', '页面跳转', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (3, '打开app', 'app', 'open', '打开应用', 'all_general', '统计一个app打开的次数。这里的app，一般是某一个单独的应用，对于前端同学来说，就是一个单独的项目仓库。', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (4, '打开详情页', 'detail', 'open', '打开一个详情页面时', 'all_general', '该事件与商品详情页（event_code = goods_detail）区别是，任何打开详情页的行为都是使用该事件进行统计。 而 goods_detail 的事件一般用来描述电商的详情页。同时他们的 event_parameters 中的参数不一样。', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (5, '打开商品详情页', 'goods_detail', 'open', '打开一个商品详情页面时', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (6, '会员登陆', 'login', 'click', '点击登录按钮', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (7, '点击参与活动', 'join_act_click', 'click', '点击参互活动', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (8, '成功参与活动', 'join_act_callback', 'callback', '参与活动成功的回调事件', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (9, '点击店铺收藏', 'favor_click', 'click', '点击收藏店铺', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (10, '成功店铺收藏', 'favor_callback', 'callback', '回调收藏店铺', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (11, '点击店铺关注', 'follow_click', 'click', '点击店铺关注', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (12, '成功店铺关注', 'follow_callback', 'callback', '成功店铺关注', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, 'Jiangxinyu', NULL, NULL);
INSERT INTO `event` VALUES (13, '点击活动签到', 'sign_click', 'click', '点击活动签到', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (14, '成功活动签到', 'sign_callback', 'callback', '成功活动签到', 'all_general', 'event_type使用click/callback的场景：签到一般会有一个签到的按钮，点击该按钮的时候，使用click；签到成功/失败的回调，使用callback。', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (15, '完善个人信息', 'perfect_userinfo', 'callback', '完善个人信息提交成功事件', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (16, '点击注册入会', 'register_click', 'click', '点击注册入会', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (17, '成功注册入会', 'register_callback', 'callback', '成功注册入会', 'all_general', 'event_type使用click/callback的场景：入会一般会有一个入会的按钮，点击该按钮的时候，使用click；入会其实也是一个过程，当入会成功之后，会到达一个入会成功/入会失败的页面，这个时候，使用callback。', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (18, '完成抽奖', 'wheel', 'callback', '完成抽奖回调', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (19, '点击加入购物车', 'add_cart_click', 'click', '点击加入购物车', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (20, '成功加入购物车', 'add_cart_callback', 'callback', '成功加入购物车', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (21, '点击收藏商品', 'favor_goods_click', 'click', '点击收藏商品', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (22, '成功收藏商品', 'favor_goods_callback', 'callback', '成功收藏商品', 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (23, '点击分享页面', 'share_click', 'click', '点击分享页面', 'all_general', '只要点击分享的按钮就进行事件上报', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (24, '成功分享页面', 'share_callback', 'callback', '成功分享页面', 'all_general', '分享成功/失败的回调中上报事件', '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (25, '发送邀请', 'invite', 'click', NULL, 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (26, '接受邀请', 'be_invited', 'click', NULL, 'all_general', NULL, '', '2021-06-17 18:15:32', 1, '2021-06-17 18:15:32', NULL, NULL, NULL, NULL);
INSERT INTO `event` VALUES (276, '前往页面1', 'page1', 'jump', '页面跳转', 'all_general', NULL, '', '2021-06-24 14:14:16', 1, '2021-06-24 14:14:16', NULL, 'Jiangxinyu', 'jump', '全部通用');
INSERT INTO `event` VALUES (277, '前往页面12', 'page2', 'jump', '页面跳转', 'all_general', NULL, '', '2021-06-30 16:02:09', 1, '2021-06-30 16:02:09', NULL, 'Jiangxinyu', 'jump', '全部通用');
COMMIT;

-- ----------------------------
-- Table structure for eventAttribute
-- ----------------------------
DROP TABLE IF EXISTS `eventAttribute`;
CREATE TABLE `eventAttribute` (
  `event_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`attribute_id`),
  UNIQUE KEY `eventAttribute_event_id_attribute_id_unique` (`event_id`,`attribute_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `eventattribute_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventattribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eventAttribute
-- ----------------------------
BEGIN;
INSERT INTO `eventAttribute` VALUES (1, 1);
INSERT INTO `eventAttribute` VALUES (2, 1);
INSERT INTO `eventAttribute` VALUES (3, 1);
COMMIT;

-- ----------------------------
-- Table structure for indicator
-- ----------------------------
DROP TABLE IF EXISTS `indicator`;
CREATE TABLE `indicator` (
  `indicator_id` int NOT NULL AUTO_INCREMENT,
  `indicator_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '指标名称',
  `indicator_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '指标类型',
  `indicator_level` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '一级指标',
  `indicator_code` varchar(40) COLLATE utf8_bin DEFAULT NULL COMMENT '指标代码',
  `indicator_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '指标标签',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `indicator_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '指标类型label',
  `indicator_level_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '一级指标label',
  `indicator_label_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '指标标签label',
  `relationship_event` int DEFAULT '1' COMMENT '事件关系',
  PRIMARY KEY (`indicator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=430 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of indicator
-- ----------------------------
BEGIN;
INSERT INTO `indicator` VALUES (1, 'PV', 'frequency', 'pv', 'pv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (3, '参与活动成功次数', 'frequency', 'cyhdcs', 'join_act_pv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (4, '活动分享次数', 'frequency', 'hdfxcs', 'share_pv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (5, '活动分享成功次数', 'frequency', 'hdfxcs', 'share_pv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (6, '发出邀请次数', 'frequency', 'fcyqcs', 'invite_pv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (7, '接受邀请次数', 'frequency', 'jsyqcs', 'invited_pv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (8, 'APP打开次数', 'frequency', 'appdkcs', 'app_pv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (9, 'UV', 'people', 'uv', 'uv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (10, '参与活动人数', 'people', 'cyhdrs', 'join_act_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (11, '参与活动成功人数', 'people', 'cyhdrs', 'join_act_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (12, '关注店铺人数', 'people', 'gzdprs', 'follow_shop_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (13, '关注店铺成功人数', 'people', 'gzdprs', 'follow_shop_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (14, '收藏店铺人数', 'people', 'scdprs', 'favor_shop_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (15, '收藏店铺成功人数', 'people', 'scdprs', 'favor_shop_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (16, '收藏商品人数', 'people', 'scsprs', 'favor_goods_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (17, '收藏商品成功人数', 'people', 'scsprs', 'favor_goods_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (18, '加购商品人数', 'people', 'jgsprs', 'add_cart_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (19, '加购商品成功人数', 'people', 'jgsprs', 'add_cart_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (20, '发出邀请人数', 'people', 'fcyqrs', 'invite_uv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (21, '接受邀请人数', 'people', 'jsyqrs', 'invited_uv', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (22, '活动分享人数', 'people', 'hdfxrs', 'share_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (23, '活动分享成功人数', 'people', 'hdfxrs', 'share_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (24, '新增会员人数', 'people', 'xzhyrs', 'membership_uv_click', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (25, '新增会员成功人数', 'people', 'xzhyrs', 'membership_uv_callback', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (26, '页面平均停留时间', 'time', 'ympjtlsj', 'page_length', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (27, '存留人数', 'retained', 'clrs', 'survivors', '', NULL, '2021-06-18 14:36:17', 1, '2021-06-18 14:36:17', NULL, 'Jiangxinyu', NULL, NULL, NULL, 1);
INSERT INTO `indicator` VALUES (428, 'test', 'frequency', 'cyhdcs', 'ww', '', '22', '2021-06-30 15:53:08', 1, '2021-06-30 15:54:01', NULL, NULL, '次数', '参与活动次数', NULL, 1);
INSERT INTO `indicator` VALUES (429, 'test1', NULL, NULL, 'wwee', '', NULL, '2021-06-30 15:54:27', 1, '2021-06-30 15:54:27', NULL, NULL, NULL, NULL, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for indicatorEvent
-- ----------------------------
DROP TABLE IF EXISTS `indicatorEvent`;
CREATE TABLE `indicatorEvent` (
  `indicator_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`indicator_id`,`event_id`),
  UNIQUE KEY `indicatorEvent_indicator_id_event_id_unique` (`indicator_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `indicatorevent_ibfk_1` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `indicatorevent_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of indicatorEvent
-- ----------------------------
BEGIN;
INSERT INTO `indicatorEvent` VALUES (1, 1);
INSERT INTO `indicatorEvent` VALUES (9, 1);
INSERT INTO `indicatorEvent` VALUES (26, 1);
INSERT INTO `indicatorEvent` VALUES (26, 2);
INSERT INTO `indicatorEvent` VALUES (8, 3);
INSERT INTO `indicatorEvent` VALUES (10, 7);
INSERT INTO `indicatorEvent` VALUES (27, 7);
INSERT INTO `indicatorEvent` VALUES (3, 8);
INSERT INTO `indicatorEvent` VALUES (11, 8);
INSERT INTO `indicatorEvent` VALUES (14, 9);
INSERT INTO `indicatorEvent` VALUES (15, 10);
INSERT INTO `indicatorEvent` VALUES (12, 11);
INSERT INTO `indicatorEvent` VALUES (13, 12);
INSERT INTO `indicatorEvent` VALUES (24, 16);
INSERT INTO `indicatorEvent` VALUES (25, 17);
INSERT INTO `indicatorEvent` VALUES (18, 19);
INSERT INTO `indicatorEvent` VALUES (19, 20);
INSERT INTO `indicatorEvent` VALUES (16, 21);
INSERT INTO `indicatorEvent` VALUES (17, 22);
INSERT INTO `indicatorEvent` VALUES (4, 23);
INSERT INTO `indicatorEvent` VALUES (22, 23);
INSERT INTO `indicatorEvent` VALUES (5, 24);
INSERT INTO `indicatorEvent` VALUES (23, 24);
INSERT INTO `indicatorEvent` VALUES (6, 25);
INSERT INTO `indicatorEvent` VALUES (20, 25);
INSERT INTO `indicatorEvent` VALUES (7, 26);
INSERT INTO `indicatorEvent` VALUES (21, 26);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `realname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role` int DEFAULT '1',
  `status` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'twb', 'tianweibi', 'BEA15426B7AF9DC91F3F583AFDD6443D', NULL, NULL, 10, 1, NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
