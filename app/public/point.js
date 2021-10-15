
    // 埋点操作手册-务必先通读一遍操作手册
    http://fed.enbrands.com/buried-docs/sdkDocs/
    //初始化代码
    {
        is_prod: false,      // 数据埋入测试环境还是正式环境
        runtime_env:'',      //  参见埋点api
        merchant_id:'未知',   //  店铺ID 也就是店铺号 无法获取就写未知
        distinct_id:'未知',   //  用户ID
        act_id:'未知',        //  活动ID 也就是活动号
        member_id:'未知',     //  会员ID
        platform_app: "test-app", 
        platform_app_code: "testcodeaa",
        platform_app_version:"1.0.0",
        application_dep_platform:"platform-ali",
        platform_business:"TB",
        application_label:"62,63,64",
        is_interactive:true
        nick:'未知',
        mix_nick:'未知',
        act_name:'未知',
        open_id:'未知',
        phone:'未知',
        ouid:'未知',
        provider:'未知',
        open_type:1,          //  1正常数据也就是对接新埋点平台，2互动营销类的，3其他
    }
    //需要埋入的事件代码
    //事件1
          {
            event_name: "事件页面-埋点",
            event_code: "sjymMaidian",
            event_label: "29",
            event_trigger_mode: "open",
            url: ""             //写页面的路径
          }
          //事件2
          {
            event_name: "应用页面-埋点",
            event_code: "yingyong_maidian",
            event_label: "29",
            event_trigger_mode: "open",
            url: ""             //写页面的路径
          }
          //事件3
          {
            event_name: "指标页面-埋点",
            event_code: "zhibiao_maidian",
            event_label: "29",
            event_trigger_mode: "open",
            url: ""             //写页面的路径
          }
          