const indicatorExcel = {
    指标名称: 'indicator_name',
    指标代码: 'indicator_code',
    指标类型:'indicator_type',
    一级指标: 'indicator_level',
    指标标签: 'indicator_label',
    备注:'note',
    创建时间:'create_time',
    自定义维度属性:'dimension_general_attr',
    自定义维度名称:'dimension_general_name',
    通用维度属性:'dimension_custom_attr',
    通用维度名称:'dimension_custom_name',
    创建人:'create_people'
};
const eventExcel = {
    事件名称: 'event_name',
    事件代码: 'event_code',
    触发类型:'event_trigger_mode',
    触发时机: 'trigger_time',
    备注:'note',
    事件标签: 'event_label',
    属性:'general_attr',
    创建人:'create_people'
};
const eventLabel={   //事件标签
    全部通用:'1',
    互动通用:"2",
    天策通用:"3",
    CRM通用:"4",
    互动定制:"5",
    天策定制:"6",
    CRM定制:"7"
}
const triggerMode={ //触发类型
    open:"open",
    click:"click",
    slide:"slide",
    callback:"callback",
    jump:"jump",
    play:"play"
}
const indicatorLabel={   //指标标签
    全部通用:'1',
    互动通用:"2",
    天策通用:"3",
    CRM通用:"4",
    互动定制:"5",
    天策定制:"6",
    CRM定制:"7"
}
const indicatorType={  //指标类型
    次数:'1',
    人数:"2",
    留存:"3",
    时长:"4",
    其他统计:"5"
}
const indicatorLevel={  //一级指标
    访问:'1',
    参与:"2",
    加购:"3",
    下单:"4",
    付款:"5",
    入会:"6"
}
module.exports={
	eventExcel ,indicatorExcel,eventLabel,triggerMode,indicatorLabel,
    indicatorType,indicatorLevel
}