//Thu Aug 01 2024 23:33:42 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
(function () {})();
const _0x175d1b = require("https"),
  _0x396354 = require("axios"),
  _0x29a336 = require("qs"),
  _0x1bbb36 = require("crypto-js"),
  _0x23d56b = require("base-64"),
  _0x56f54e = require("node-rsa"),
  _0x5392c3 = require("fs"),
  _0x37f2ea = require("path"),
  {
    format: _0x2dbcae
  } = require("date-fns"),
  _0x5b1859 = require("./jdCookie.js"),
  {
    HttpsProxyAgent: _0x4b421e
  } = require("https-proxy-agent"),
  _0x5d0af1 = require("tls"),
  _0x105fa7 = require("cheerio"),
  _0x1f240b = require("yaml"),
  _0x53d16c = require("url"),
  {
    machineIdSync: _0x34392c
  } = require("node-machine-id"),
  _0xce4c0d = require("./sendNotify");
let _0x215d5c = ["来晚了", "已发完", "参数缺失或无效", "超出活动计划时间", "奖品发送失败", "发放完", "全部被领取", "余额不足", "已结束", "活动已经结束", "未开始", "此京豆计划已经结束", "已经发完", "活动不存在"];
process.env.B_WX_STOP_KEYWORD ? process.env.B_WX_STOP_KEYWORD.split(/[@,&|]/).forEach(_0xc371f4 => _0x215d5c.push(_0xc371f4)) : "";
let _0x5416cb = ["京豆", "红包", "券", "再来一次", "客服"],
  _0x3f274a = ["下单满", "签收后", "收到货后", "成功购买任意", "必须购买店铺内"];
process.env.B_WX_ADDRESS_STOP_KEYWORD ? process.env.B_WX_ADDRESS_STOP_KEYWORD.split(/[@,&|]/).forEach(_0x575a88 => _0x5416cb.push(_0x575a88)) : "";
process.env.B_WX_ADDRESS_STOP_KEYWORD_RULE ? process.env.B_WX_ADDRESS_STOP_KEYWORD_RULE.split(/[@,&|]/).forEach(_0x14ac7d => _0x3f274a.push(_0x14ac7d)) : "";
let _0x190f04 = [];
process.env.B_WX_WHITELIST ? process.env.B_WX_WHITELIST.split(/[@,&|]/).forEach(_0x1dee90 => _0x190f04.push(_0x1dee90.includes("-") ? _0x1dee90 : _0x1dee90 * 1)) : [];
let _0x56572b = ["10052"];
process.env.B_WX_OPEN_CARD_TYPES ? process.env.B_WX_OPEN_CARD_TYPES.split(/[@,&|]/).forEach(_0x17bdc9 => _0x56572b.push(_0x17bdc9)) : "";
const _0x412771 = {
    "wxProxyEnable": parseInt(process.env.B_WX_PROXY_ENABLE || "2"),
    "wxProxyUrl": process.env.B_WX_PROXY_URL || "",
    "wxProxySmart": parseInt(process.env.B_WX_PROXY_SMART || "2"),
    "wxProxyInterval": parseInt(process.env.B_WX_PROXY_INTERVAL || 120),
    "wxProxyMode": parseInt(process.env.B_WX_PROXY_MODE || "1"),
    "wxProxyCheck": parseInt(process.env.B_WX_PROXY_CHECK || "1"),
    "proxyRegx": process.env.B_WX_PROXY_ENABLE_REGEXP ? process.env.B_WX_PROXY_ENABLE_REGEXP : "(Request failed with status code (403|407|493|429|497|500|502|503|504))|certificate|timeout|ECONNRESET|ECONNREFUSED|ETIMEDOUT|(tunneling socket could not be established)|(socket hang up)|(CONNECT response)|(socket disconnected)",
    "isvObfuscatorRetry": parseInt(process.env?.["B_WX_ISVOBFUSCATOR_RETRY"] || 1),
    "isvObfuscatorRetryWait": parseInt(process.env?.["B_WX_ISVOBFUSCATOR_RETRY_WAIT"] || 2),
    "notInitPinTokenRegx": /lorealjdcampaign-rc.isvjcloud.com|interaction/,
    "messageMasked": parseInt(process.env.B_WX_MESSAGE_MASKED || "2"),
    "messageSingle": parseInt(process.env.B_WX_MESSAGE_SINGLE || "2"),
    "addressUseNum": parseInt(process.env.B_WX_ADDRESS_USE_NUM || "0"),
    "wxBlockRegx": process.env.B_WX_BLOCK_PIN_REGX || "",
    "wxEnableOtherEnv": parseInt(process.env.B_WX_ENABLE_OTHER_ENV || "1"),
    "timeoutDuration": parseInt(process.env.B_WX_TIMEOUT_DURATION || "30"),
    "reTryRegx": "(哎呀活动火爆，请稍后再试|活动太火爆了|活动过于火爆|服务器数据忙|奖品与您擦肩而过了哟)",
    "retryCount": parseInt(process.env.B_RETRY_COUNT || "20"),
    "proxyRetryCount": parseInt(process.env.B_PROXY_RETRY_COUNT || "5"),
    "immediatelyExit": parseInt(process.env.B_IMMEDIATE_EXIT || "0"),
    "showProxyRetryLog": parseInt(process.env.B_SHOW_PROXY_RETRY_LOG || "1"),
    "stopKeywords": _0x215d5c,
    "addressStopKeywords": _0x5416cb,
    "addressStopKeywordsRule": _0x3f274a,
    "wxWhitelist": _0x190f04,
    "openCardTypes": _0x56572b
  },
  _0x71dddb = {
    "B_WX_PROXY_ENABLE": "wxProxyEnable",
    "B_WX_PROXY_URL": "wxProxyUrl",
    "B_WX_PROXY_SMART": "wxProxySmart",
    "B_WX_PROXY_INTERVAL": "wxProxyInterval",
    "B_WX_PROXY_MODE": "wxProxyMode",
    "B_WX_PROXY_CHECK": "wxProxyCheck",
    "B_WX_PROXY_ENABLE_REGEXP": "proxyRegx",
    "B_WX_ISVOBFUSCATOR_RETRY": "isvObfuscatorRetry",
    "B_WX_ISVOBFUSCATOR_RETRY_WAIT": "isvObfuscatorRetryWait",
    "B_WX_MESSAGE_MASKED": "messageMasked",
    "B_WX_MESSAGE_SINGLE": "messageSingle",
    "B_WX_ADDRESS_USE_NUM": "addressUseNum",
    "B_WX_BLOCK_PIN_REGX": "wxBlockRegx",
    "B_WX_ENABLE_OTHER_ENV": "wxEnableOtherEnv",
    "B_WX_TIMEOUT_DURATION": "timeoutDuration",
    "B_WX_STOP_KEYWORD": "__stopKeywords__",
    "B_WX_ADDRESS_STOP_KEYWORD": "__addressStopKeywords__",
    "B_WX_ADDRESS_STOP_KEYWORD_RULE": "__addressStopKeywordsRule__",
    "B_WX_WHITELIST": "__wxWhitelist",
    "B_WX_OPEN_CARD_TYPES": "__openCardTypes__",
    "B_RETRY_COUNT": "retryCount",
    "B_PROXY_RETRY_COUNT": "proxyRetryCount",
    "B_SHOW_PROXY_RETRY_LOG": "showProxyRetryLog"
  },
  _0x3e16c8 = {
    "mode": __dirname.includes("bear"),
    "wxRunMode": parseInt(process.env.B_WX_RUN_MODE || "1"),
    "wxScheduledNotify": parseInt(process.env.B_WX_SCHEDULE || "1"),
    "apiToken": process.env.B_API_TOKEN ? process.env.B_API_TOKEN : "",
    "showDebugInfo": parseInt(process.env.B_WX_DEBUG_INFO || "2"),
    "hdbTypes": ["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"],
    "pushUserDetail": process.env.PUSH_USER_DETAIL || "",
    "pushTgBotToken": process.env.PUSH_TG_BOT_TOKEN || "",
    "scheduleTgBotToken": process.env.SCHEDULE_TG_BOT_TOKEN || "",
    "scheduleTgUserId": process.env.SCHEDULE_TG_USER_ID || "",
    "urlPrefixes": {
      "/prod/cc/interactsaas": /interactsaas/,
      "/crm-proya/apps/interact": /crm-proya/,
      "/apps/interac": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc/,
      "/prod/cc/cjwx": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc\/cjwx/,
      "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/interact/,
      "/prod/cc/interaction/v1": /interaction\/v1/,
      "/prod/cc/interaction/v2": /interaction\/v2/
    },
    "jdAppTlsOptions": {
      "secureProtocol": "TLSv1_2_method",
      "ciphers": "TLS_GREASE 0x4a 0x4a:TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA:TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA:TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA:TLS_RSA_WITH_AES_256_GCM_SHA384:TLS_RSA_WITH_AES_128_GCM_SHA256:TLS_RSA_WITH_AES_256_CBC_SHA:TLS_RSA_WITH_AES_128_CBC_SHA:TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA:TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA:TLS_RSA_WITH_3DES_EDE_CBC_SHA"
    }
  },
  _0x4692c5 = {
    "B_WX_RUN_MODE": "wxRunMode",
    "B_WX_SCHEDULE": "wxScheduledNotify",
    "B_API_TOKEN": "apiToken",
    "B_WX_DEBUG_INFO": "showDebugInfo",
    "PUSH_USER_DETAIL": "pushUserDetail",
    "PUSH_TG_BOT_TOKEN": "pushTgBotToken",
    "SCHEDULE_TG_BOT_TOKEN": "scheduleTgBotToken",
    "SCHEDULE_TG_USER_ID": "scheduleTgUserId"
  };
_0x3e16c8.mode && (_0x412771.wxEnableOtherEnv = 2);
class _0xc186c5 extends Error {
  constructor(_0x45e2e0) {
    super(_0x45e2e0);
    this.name = "customAssert";
  }
}
class _0x112afa extends Error {
  constructor(_0x48cef2) {
    super(_0x48cef2);
    this.name = "customStop";
  }
}
function _0x2bb6ed(..._0x376bed) {
  const _0x15328d = new Date(),
    _0x1eb833 = _0x2dbcae(_0x15328d, "yyyy-MM-dd HH:mm:ss.SSS"),
    _0x4242ff = _0x376bed.map(_0x2000a9 => {
      if (_0x2000a9 && _0x2000a9.constructor === Object) return JSON.stringify(_0x2000a9);
      return _0x2000a9;
    });
  console.log(_0x1eb833, ..._0x4242ff);
}
function _0x1857f7(_0x2a5bf1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return _0x2a5bf1.replace(/[xy]/g, function (_0x534ae4) {
    const _0x376648 = 16 * Math.random() | 0,
      _0x11fa3b = "x" === _0x534ae4 ? _0x376648 : 3 & _0x376648 | 8;
    return _0x11fa3b.toString(36);
  });
}
class _0x44bf5f {
  static ["ivs"] = ["13.2", "13.5", "14.4", "15.1", "15.1.1", "15.2", "15.2.1", "15.3", "15.3.1", "15.4", "15.4.1", "15.5", "16.0", "16.1", "16.6", "16.6.1", "16.7", "17.0", "17.1", "17.1.2", "17.2", "17.3", "17.4", "17.5"];
  static ["phones"] = [{
    "model": "X",
    "screen": "1125*2436",
    "tf": "10,3",
    "ivsRange": [0, 17]
  }, {
    "model": "XS",
    "screen": "1125*2436",
    "tf": "11,2",
    "ivsRange": [0, 24]
  }, {
    "model": "XsMax",
    "screen": "1242*2688",
    "tf": "11,4",
    "ivsRange": [0, 24]
  }, {
    "model": "XR",
    "screen": "828*1792",
    "tf": "11,8",
    "ivsRange": [0, 24]
  }, {
    "model": "11",
    "screen": "828*1792",
    "tf": "12,1",
    "ivsRange": [0, 24]
  }, {
    "model": "11Pro",
    "screen": "1125*2436",
    "tf": "12,3",
    "ivsRange": [0, 24]
  }, {
    "model": "11ProMax",
    "screen": "1242*2688",
    "tf": "12,5",
    "ivsRange": [0, 24]
  }, {
    "model": "12",
    "screen": "1170*2532",
    "tf": "13,2",
    "ivsRange": [2, 24]
  }, {
    "model": "12Pro",
    "screen": "1170*2532",
    "tf": "13,3",
    "ivsRange": [2, 24]
  }, {
    "model": "12ProMax",
    "screen": "1284*2778",
    "tf": "13,4",
    "ivsRange": [2, 24]
  }, {
    "model": "13",
    "screen": "1170*2532",
    "tf": "14,5",
    "ivsRange": [3, 24]
  }, {
    "model": "13Pro",
    "screen": "1170*2532",
    "tf": "14,2",
    "ivsRange": [3, 24]
  }, {
    "model": "13ProMax",
    "screen": "1284*2778",
    "tf": "14,3",
    "ivsRange": [3, 24]
  }, {
    "model": "14",
    "screen": "1170*2532",
    "tf": "14,7",
    "ivsRange": [12, 24]
  }, {
    "model": "14Plus",
    "screen": "1284*2778",
    "tf": "14,8",
    "ivsRange": [12, 24]
  }, {
    "model": "14Pro",
    "screen": "1179*2556",
    "tf": "15,2",
    "ivsRange": [12, 24]
  }, {
    "model": "14ProMax",
    "screen": "1290*2796",
    "tf": "15,3",
    "ivsRange": [12, 24]
  }, {
    "model": "15",
    "screen": "1170*2532",
    "tf": "15,4",
    "ivsRange": [17, 24]
  }, {
    "model": "15Plus",
    "screen": "1179*2556",
    "tf": "15,5",
    "ivsRange": [17, 24]
  }, {
    "model": "15Pro",
    "screen": "1179*2556",
    "tf": "16,1",
    "ivsRange": [17, 24]
  }, {
    "model": "15ProMax",
    "screen": "1290*2796",
    "tf": "16,2",
    "ivsRange": [17, 24]
  }];
  static ["generatePhoneInfo"](_0x14ef47 = null) {
    const _0x188067 = this.phones[Math.floor(Math.random() * this.phones.length)],
      _0x2db111 = this.ivs.slice(_0x188067.ivsRange[0], _0x188067.ivsRange[1]),
      _0x23be53 = _0x2db111[Math.floor(Math.random() * _0x2db111.length)],
      _0x1da806 = {
        "12.4.2": "169143",
        "12.4.3": "169159",
        "12.4.4": "169175",
        "12.6.0": "169204",
        "12.6.2": "169227"
      },
      _0x39e6de = Object.keys(_0x1da806),
      _0x26a7c1 = _0x14ef47 === null ? _0x39e6de[Math.floor(Math.random() * _0x39e6de.length)] : _0x14ef47;
    return {
      "phone": _0x188067.model,
      "screen": _0x188067.screen,
      "tf": _0x188067.tf,
      "iv": _0x23be53,
      "clientVersion": _0x26a7c1,
      "build": _0x1da806[_0x26a7c1],
      "uuid": _0x1857f7()
    };
  }
}
function _0x17e2bb(_0x5940e6, _0x497568, _0x1cdaa3) {
  const _0x1e1e1a = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
  function _0x55a0eb(_0x297a87) {
    _0x297a87 = _0x297a87.split("").reverse().join("");
    const _0x1ed56c = new Uint8Array(12),
      _0x11717e = new TextEncoder().encode(_0x297a87);
    for (let _0xdb1e84 = 0; _0xdb1e84 < _0x11717e.length; _0xdb1e84 += 2) {
      let _0x26c6a7 = _0x11717e[_0xdb1e84] << 5 | _0x11717e[_0xdb1e84 + 1] & 255;
      _0x26c6a7 %= 63;
      _0x1ed56c[_0xdb1e84 >> 1] = _0x26c6a7;
    }
    let _0x28d8bb = "";
    for (let _0x321044 = 0; _0x321044 < _0x1ed56c.length; _0x321044++) {
      _0x28d8bb += (_0x1ed56c[_0x321044] + 256).toString(2).slice(1);
    }
    let _0x1850e0 = "",
      _0x499bec = "";
    for (let _0x1fc4ef = 0; _0x1fc4ef < 16; _0x1fc4ef++) {
      if (_0x1fc4ef !== 0) {
        const _0x4ca30b = _0x1fc4ef * 6,
          _0x1f1863 = _0x28d8bb.substring(_0x4ca30b, _0x4ca30b + 6);
        let _0x1330a9 = parseInt(_0x1f1863, 2);
        const _0x25f6ea = _0x499bec.split("");
        for (let _0x10ccb3 = 0; _0x10ccb3 < _0x25f6ea.length; _0x10ccb3++) {
          _0x25f6ea[_0x10ccb3] === "1" && (_0x1330a9 = (_0x1330a9 >> 6 - _0x10ccb3 | _0x1330a9 << _0x10ccb3) & 63);
        }
        _0x499bec = (_0x1330a9 & 63).toString(2).padStart(6, "0");
      } else _0x499bec = _0x28d8bb.substring(0, 6);
      _0x1850e0 += _0x499bec;
    }
    for (let _0x4ece6f = 0; _0x4ece6f < 12; _0x4ece6f++) {
      const _0x534fd4 = _0x4ece6f * 8;
      _0x1ed56c[_0x4ece6f] = parseInt(_0x1850e0.substring(_0x534fd4, _0x534fd4 + 8), 2);
    }
    const _0x1a4f6d = btoa(String.fromCharCode.apply(null, _0x1ed56c));
    return _0x1a4f6d;
  }
  let _0x4af7e0 = Date.now() + parseInt(_0x1cdaa3);
  typeof _0x5940e6 != "object" && (_0x5940e6 = JSON.parse(_0x5940e6));
  _0x5940e6.nowTime = _0x4af7e0;
  let _0x1079e5 = _0x497568 + _0x4af7e0;
  const _0x598f6d = _0x1079e5.substring(0, _0x1079e5.length - 5);
  let _0x2bf298 = "";
  for (let _0x27ec0b = 0; _0x27ec0b < _0x598f6d.length; _0x27ec0b++) {
    let _0x5c2bb9 = _0x598f6d.charCodeAt(_0x27ec0b),
      _0x26a55f = _0x5c2bb9 % 10,
      _0x3f6dd2 = _0x1e1e1a[_0x26a55f][_0x27ec0b];
    _0x2bf298 += _0x3f6dd2;
  }
  var _0x591e5d = _0x2bf298.length,
    _0x1eabcd = Math.floor(_0x591e5d / 24),
    _0x50890d = "";
  for (var _0x38eafd = 0; _0x38eafd < 24; _0x38eafd++) {
    var _0x1c2b93 = (_0x38eafd + 1) * _0x1eabcd;
    _0x38eafd === 23 && (_0x1c2b93 = _0x591e5d);
    var _0x2115c9 = _0x2bf298.substring(_0x38eafd * _0x1eabcd, _0x1c2b93),
      _0x536680 = [];
    for (var _0xe1ee0f = 0; _0xe1ee0f < _0x2115c9.length; _0xe1ee0f++) {
      _0x536680.push(_0x2115c9.charCodeAt(_0xe1ee0f));
    }
    var _0x4d97e0 = _0x536680.reduce(function (_0x1abd44, _0x2d45d2) {
        return _0x1abd44 + _0x2d45d2;
      }, 0),
      _0x144d07 = Math.floor(_0x4d97e0 / _0x536680.length);
    _0x50890d += String.fromCharCode(_0x144d07);
  }
  _0x2bf298 = _0x50890d;
  const _0x5bb4c7 = _0x55a0eb(_0x2bf298),
    _0x1e3184 = _0x1bbb36.enc.Utf8.parse(_0x5bb4c7),
    _0x5a6cb0 = _0x1bbb36.enc.Utf8.parse(""),
    _0x5c8ba2 = _0x1bbb36.AES.encrypt(JSON.stringify(_0x5940e6), _0x1e3184, {
      "iv": _0x5a6cb0,
      "mode": _0x1bbb36.mode.ECB,
      "padding": _0x1bbb36.pad.Pkcs7
    });
  return _0x5c8ba2.toString();
}
function _0x5df805(_0x5c6a80 = {}) {
  const _0x3a4960 = {
      "method": "get",
      "timeout": 30000
    },
    _0xb61897 = Object.assign({}, _0x3a4960, _0x5c6a80),
    _0x546a04 = _0x396354.CancelToken.source(),
    _0x5261cb = _0xb61897.timeout || 20000,
    _0x25c82d = setTimeout(() => {
      _0x546a04.cancel("Request canceled due to timeout (" + _0x5261cb + " ms)");
    }, _0x5261cb);
  return _0x396354({
    ..._0xb61897,
    "cancelToken": _0x546a04.token
  }).then(_0x1b48f3 => {
    return clearTimeout(_0x25c82d), _0x1b48f3;
  }).catch(_0x5cf707 => {
    clearTimeout(_0x25c82d);
    throw _0x5cf707;
  });
}
function _0x1865bf(_0x16e402) {
  if (_0x16e402.proxy) {
    const _0x885ac5 = new _0x4b421e(_0x16e402.proxy),
      _0x2ba2f3 = _0x885ac5.addRequest;
    return _0x885ac5.addRequest = function (_0x2347ab, _0x80b601, _0x44ad79) {
      return Object.assign(_0x80b601, _0x16e402.tlsOptions, {
        "ciphers": _0x16e402.tlsOptions?.["ciphers"] || _0x5d0af1.DEFAULT_CIPHERS
      }), _0x2ba2f3.call(this, _0x2347ab, _0x80b601, _0x44ad79);
    }, _0x885ac5;
  }
  const _0x448fa5 = new _0x175d1b.Agent({
    ..._0x16e402.tlsOptions,
    "ciphers": _0x16e402.tlsOptions?.["ciphers"] || _0x5d0af1.DEFAULT_CIPHERS
  });
  return _0x448fa5;
}
class _0x47f47c {
  constructor(_0x39d9af, _0x949a13) {
    this.ua = _0x39d9af;
    this.pin = _0x949a13;
    this.av = _0x39d9af.slice(_0x39d9af.indexOf("/") + 1);
    this.sua = _0x39d9af.substring(_0x39d9af.indexOf("(") + 1, _0x39d9af.indexOf(")"));
    this.random = this.#randomString(10, true);
    this.cacheInfo = {};
  }
  #getRandomString(_0x227fdd, _0x705ed3) {
    let _0x446d0b = "",
      _0x466f90 = _0x227fdd.split("");
    for (let _0x19e022 = 0; _0x19e022 < _0x705ed3; _0x19e022++) {
      let _0x267502 = Math.floor(Math.random() * _0x466f90.length);
      _0x446d0b += _0x466f90[_0x267502];
    }
    return _0x446d0b;
  }
  #randomString(_0x264aa4, _0x1ec383) {
    var _0x57c021 = "",
      _0x4c4c83 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var _0x4a7b8d = 0; _0x4a7b8d < _0x264aa4; _0x4a7b8d++) {
      var _0x4bedcd = _0x4c4c83;
      _0x4a7b8d === 0 && _0x1ec383 && (_0x4bedcd = _0x4c4c83.slice(1));
      var _0x1c39e0 = Math.round(Math.random() * (_0x4bedcd.length - 1));
      _0x57c021 += _0x4bedcd.substring(_0x1c39e0, _0x1c39e0 + 1);
    }
    return _0x57c021;
  }
  #generateFp(_0x1b3177) {
    let _0x4b3f35 = 3,
      _0x589474 = "0123456789",
      _0x1758c8 = 12;
    if (_0x1b3177 === "4.4") _0x4b3f35 = 4, _0x589474 = "1uct6d0jhq", _0x1758c8 = 11;else {
      if (_0x1b3177 === "4.3") _0x4b3f35 = 3, _0x589474 = "kl9i1uct6d", _0x1758c8 = 12;else {
        if (_0x1b3177 == "4.2") _0x4b3f35 = 4, _0x589474 = "6d0jhqw3pa", _0x1758c8 = 11;else {
          if (_0x1b3177 == "4.1") {
            _0x4b3f35 = 6;
            _0x589474 = "uct6d0jhqw";
            _0x1758c8 = 9;
          }
        }
      }
    }
    let _0x426d5e,
      _0x360c0e = "";
    do {
      _0x426d5e = this.#getRandomString(_0x589474, 1);
      _0x360c0e.indexOf(_0x426d5e) == -1 && (_0x360c0e += _0x426d5e);
    } while (_0x360c0e.length < _0x4b3f35);
    for (let _0x64d7ef of _0x360c0e.slice()) {
      _0x589474 = _0x589474.replace(_0x64d7ef, "");
    }
    let _0x4aff60 = Math.floor(Math.random() * 10),
      _0x27df34 = this.#getRandomString(_0x589474, _0x4aff60) + _0x360c0e + this.#getRandomString(_0x589474, _0x1758c8 - _0x4aff60) + _0x4aff60,
      _0x50dc6a = _0x27df34.split(""),
      _0x3ce1a6;
    if (_0x1b3177 === "4.4") {
      let _0x1cc0fb = _0x50dc6a.slice(0, 8),
        _0x30fdb8 = _0x50dc6a.slice(8),
        _0x4745d4 = _0x1cc0fb.reverse();
      _0x3ce1a6 = _0x4745d4.map(_0x911c => (35 - parseInt(_0x911c, 36)).toString(36));
      _0x3ce1a6.push(..._0x30fdb8);
    } else {
      if (_0x1b3177 === "4.3") {
        let _0x4b7aa3 = _0x50dc6a.slice(0, 10),
          _0x565230 = _0x50dc6a.slice(10),
          _0x257dae = _0x4b7aa3.reverse();
        _0x3ce1a6 = _0x257dae.map(_0x5dcaea => (35 - parseInt(_0x5dcaea, 36)).toString(36));
        _0x3ce1a6.push(..._0x565230);
      } else {
        if (_0x1b3177 === "4.1" || _0x1b3177 === "4.2") {
          let _0x130eb0 = _0x50dc6a.slice(0, 14),
            _0xd3c022 = _0x50dc6a.slice(14),
            _0x541326 = _0x130eb0.reverse();
          _0x3ce1a6 = _0x541326.map(_0x5342db => (35 - parseInt(_0x5342db, 36)).toString(36));
          _0x3ce1a6.push(..._0xd3c022);
        } else _0x3ce1a6 = _0x50dc6a.reverse().map(_0x5e9bb4 => 9 - parseInt(_0x5e9bb4));
      }
    }
    let _0x4690e5 = _0x3ce1a6.join("");
    return _0x4690e5;
  }
  #generateExpandParams(_0x5f1d52, _0x4bd25b, _0x5d5d57) {
    let _0x529509 = {};
    if (_0x5d5d57 === "4.4") _0x529509 = {
      "wc": 0,
      "wd": 0,
      "l": "zh-CN",
      "ls": "zh-CN,zh,zh-TW,en-US,en",
      "ml": 0,
      "pl": 0,
      "av": this.av,
      "ua": this.ua,
      "sua": this.sua,
      "pp": {
        "p1": this.pin,
        "p2": this.pin
      },
      "extend": {
        "wd": 0,
        "l": 0,
        "ls": 0,
        "wk": 0,
        "bu1": "0.1.9",
        "bu2": 0,
        "bu3": 16,
        "bu4": 0,
        "bu5": 0
      },
      "pp1": "",
      "bu1": "",
      "w": 390,
      "h": 844,
      "ow": 390,
      "oh": 844,
      "url": "",
      "og": "",
      "pr": 1.25,
      "re": "h",
      "random": this.random,
      "referer": "",
      "v": "h5_file_v4.4.0",
      "ai": _0x5f1d52,
      "fp": _0x4bd25b
    };else {
      if (_0x5d5d57 === "4.3") _0x529509 = {
        "wc": 0,
        "wd": 0,
        "l": "zh-CN",
        "ls": "zh-CN,zh,zh-TW,en-US,en",
        "ml": 0,
        "pl": 0,
        "av": this.av,
        "ua": this.ua,
        "sua": this.sua,
        "pp": {
          "p2": this.pin
        },
        "extend": {
          "wd": 0,
          "l": 0,
          "ls": 0,
          "wk": 0,
          "bu1": "0.1.7",
          "bu2": 0,
          "bu3": 35
        },
        "pp1": "",
        "w": 400,
        "h": 700,
        "ow": 400,
        "oh": 700,
        "url": "",
        "og": "",
        "pr": 1.25,
        "re": "",
        "random": this.random,
        "referer": "",
        "v": "h5_file_v4.3.1",
        "ai": _0x5f1d52,
        "fp": _0x4bd25b
      };else {
        if (_0x5d5d57 === "4.2") {
          _0x529509 = {
            "wc": 0,
            "wd": 0,
            "l": "zh-CN",
            "ls": "zh-CN",
            "ml": 0,
            "pl": 0,
            "av": this.av,
            "ua": this.ua,
            "sua": this.sua,
            "pp": {},
            "extend": {
              "pm": 0,
              "wd": 0,
              "l": 0,
              "ls": 0,
              "wk": 0,
              "bu1": "0.1.9"
            },
            "pp1": "",
            "pm": {
              "ps": "prompt",
              "np": "default"
            },
            "w": 390,
            "h": 844,
            "ow": 390,
            "oh": 844,
            "url": "",
            "og": "",
            "pr": 1.25,
            "re": "",
            "random": this.random,
            "referer": "",
            "v": "h5_file_v4.2.0",
            "ai": _0x5f1d52,
            "fp": _0x4bd25b
          };
        } else {
          if (_0x5d5d57 === "4.1") _0x529509 = {
            "wc": 0,
            "wd": 0,
            "l": "zh-CN",
            "ls": "zh-CN,zh,zh-TW,en-US,en",
            "ml": 0,
            "pl": 0,
            "av": this.av,
            "ua": this.ua,
            "sua": this.sua,
            "pp": {
              "p2": this.pin
            },
            "pp1": "",
            "pm": {
              "ps": "prompt",
              "np": "default"
            },
            "w": 360,
            "h": 740,
            "ow": 360,
            "oh": 740,
            "url": "",
            "og": "",
            "pr": 4,
            "re": "",
            "random": this.random,
            "referer": "",
            "v": "v0.1.6",
            "ai": _0x5f1d52,
            "fp": _0x4bd25b
          };else _0x529509 = {
            "wc": 0,
            "wd": 0,
            "l": "zh-CN",
            "ls": "zh-CN,zh,zh-TW,en-US,en",
            "ml": 0,
            "pl": 0,
            "av": this.av,
            "ua": this.ua,
            "sua": this.sua,
            "pp": {
              "p2": this.pin
            },
            "pp1": "",
            "pm": {
              "ps": "prompt",
              "np": "default"
            },
            "w": 360,
            "h": 740,
            "ow": 360,
            "oh": 740,
            "url": "",
            "og": "",
            "pr": 4,
            "re": "",
            "ai": _0x5f1d52,
            "fp": _0x4bd25b
          };
        }
      }
    }
    return _0x1bbb36.AES.encrypt(JSON.stringify(_0x529509, null, 2), _0x1bbb36.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
      "iv": _0x1bbb36.enc.Utf8.parse("0102030405060708"),
      "mode": _0x1bbb36.mode.CBC,
      "padding": _0x1bbb36.pad.Pkcs7
    }).ciphertext.toString(_0x1bbb36.enc.Hex);
  }
  async #getAlgo(_0x283ad5, _0x4f5094, _0x363ede, _0x14a65c, _0x557139 = 0) {
    let _0x11fdd6 = "",
      _0x4bed26 = {
        "version": _0x14a65c,
        "fp": _0x4f5094,
        "fv": "v3.2.0",
        "appId": _0x283ad5,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": _0x363ede
      };
    if (_0x14a65c === "4.4") _0x4bed26.fv = "h5_file_v4.4.0";else {
      if (_0x14a65c === "4.3") _0x4bed26.fv = "h5_file_v4.3.1";else _0x14a65c === "4.2" ? _0x4bed26.fv = "h5_file_v4.2.0" : _0x14a65c === "4.1" && (_0x4bed26.fv = "v1.6.1");
    }
    try {
      let _0x2165d6 = await _0x396354({
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "method": "post",
        "data": _0x4bed26,
        "headers": {
          "User-Agent": this.ua
        }
      });
      if (_0x2165d6.status == 200) {
        let _0x515733 = _0x2165d6.data.data.result;
        _0x11fdd6 = {
          "tk": _0x515733.tk,
          "fp": _0x515733.fp,
          "rd": /(?<=rd=')[^']*/.exec(_0x515733.algo)[0],
          "algo": /(?<=algo\.)[^(]*/.exec(_0x515733.algo)[0]
        };
      }
      return _0x11fdd6;
    } catch (_0x1c0d9c) {
      console.log("algo error");
      if (_0x557139 < 3) return this.#getAlgo(_0x283ad5, _0x4f5094, _0x363ede, _0x14a65c, _0x557139 + 1);
      throw _0x1c0d9c;
    }
  }
  #test(_0xa04746, _0x2a8218, _0x369f00, _0x5e72c5, _0x54c97c, _0x583c0e, _0x34f0ef) {
    let _0x997ddd = _0x34f0ef === "4.4" ? "88" : _0x34f0ef === "4.3" ? "22" : _0x34f0ef === "4.2" ? "74" : _0x34f0ef === "4.1" ? "04" : "",
      _0x35e8bf = "" + _0x2a8218 + _0xa04746 + _0x369f00 + _0x997ddd + _0x5e72c5 + _0x54c97c;
    return _0x1bbb36[_0x583c0e](_0x35e8bf, _0x2a8218).toString(_0x1bbb36.enc.Hex);
  }
  async ["encrypt"](_0x25210e, _0x22360c, _0x136bdc, _0x4e6761, _0x5c6cb1, _0x510d39, _0x24e812, _0x33854b) {
    if (!(_0x25210e in this.cacheInfo)) {
      let _0x110c18 = this.#generateFp(_0x33854b);
      const _0x339ef9 = this.#generateExpandParams(_0x25210e, _0x110c18, _0x33854b);
      let _0x4565be = 0,
        _0xc84ab6;
      while (_0x4565be < 3) {
        _0xc84ab6 = await this.#getAlgo(_0x25210e, _0x110c18, _0x339ef9, _0x33854b);
        if (_0xc84ab6 !== "") break;
        _0x4565be++;
      }
      this.cacheInfo[_0x25210e] = _0xc84ab6;
    }
    const {
        tk: _0x3f52a7,
        rd: _0x3f0f98,
        fp: _0x7ad8c9,
        algo: _0xe0f460
      } = this.cacheInfo[_0x25210e],
      _0x3272e5 = new Date(),
      _0x17f65b = _0x2dbcae(_0x3272e5, "yyyyMMddHHmmssSSS"),
      _0x1ca77d = this.#test(_0x7ad8c9, _0x3f52a7, _0x17f65b, _0x25210e, _0x3f0f98, _0xe0f460, _0x33854b),
      _0x5306bf = typeof _0x136bdc == "object" ? JSON.stringify(_0x136bdc) : _0x136bdc,
      _0x19ac0f = _0x1bbb36.SHA256(_0x5306bf).toString(_0x1bbb36.enc.Hex);
    let _0x3c8910 = "appid:" + _0x4e6761 + "&body:" + _0x19ac0f;
    _0x5c6cb1 != null && (_0x3c8910 += "&client:" + _0x5c6cb1);
    _0x510d39 != null && (_0x3c8910 += "&clientVersion:" + _0x510d39);
    _0x3c8910 += "&functionId:" + _0x22360c;
    _0x24e812 != null && (_0x3c8910 += "&t:" + _0x24e812);
    let _0x2729ee, _0x3b278f, _0xced0d1;
    if (_0x33854b === "4.4") _0x3b278f = {
      "sua": this.sua,
      "pp": {
        "p1": this.pin
      },
      "extend": {
        "wd": 0,
        "l": 0,
        "ls": 0,
        "wk": 0,
        "bu1": "0.1.9",
        "bu2": -1,
        "bu3": 15,
        "bu4": 0,
        "bu5": 0
      },
      "random": this.random,
      "v": "h5_file_v4.4.0",
      "fp": _0x7ad8c9,
      "bu1": "0.1.9"
    }, _0xced0d1 = "r1T.6Vinpb.k+/a)", _0x2729ee = _0x1bbb36.MD5("" + _0x1ca77d + _0x3c8910 + _0x1ca77d).toString(_0x1bbb36.enc.Hex);else {
      if (_0x33854b === "4.3") _0x2729ee = _0x1bbb36.HmacSHA256(_0x3c8910, _0x1ca77d).toString(_0x1bbb36.enc.Hex), _0x3b278f = {
        "sua": this.sua,
        "pp": {
          "p2": this.pin
        },
        "extend": {
          "wd": 0,
          "l": 0,
          "ls": 0,
          "wk": 0,
          "bu1": "0.1.7",
          "bu2": 0,
          "bu3": 33
        },
        "random": this.random,
        "referer": "",
        "v": "h5_file_v4.3.1",
        "fp": _0x7ad8c9
      }, _0xced0d1 = "&d74&yWoV.EYbWbZ";else {
        if (_0x33854b === "4.2") _0x2729ee = _0x1bbb36.SHA256("" + _0x1ca77d + _0x3c8910 + _0x1ca77d).toString(_0x1bbb36.enc.Hex), _0x3b278f = {
          "sua": this.sua,
          "pp": {
            "p2": this.pin
          },
          "extend": {
            "pm": 0,
            "wd": 0,
            "l": 0,
            "ls": 0,
            "wk": 0,
            "bu1": "0.1.9"
          },
          "random": this.random,
          "referer": "",
          "v": "h5_file_v4.2.0",
          "fp": _0x7ad8c9
        }, _0xced0d1 = "DNiHi703B0&17hh1";else {
          if (_0x33854b === "4.1") _0x2729ee = _0x1bbb36.MD5("" + _0x1ca77d + _0x3c8910 + _0x1ca77d).toString(_0x1bbb36.enc.Hex), _0x3b278f = {
            "sua": this.sua,
            "pp": {
              "p2": this.pin
            },
            "random": this.random,
            "referer": "",
            "v": "v0.1.6",
            "fp": _0x7ad8c9
          }, _0xced0d1 = "HL4|FW#Chc3#q?0)";else {
            _0x2729ee = _0x1bbb36.HmacSHA256(_0x3c8910, _0x1ca77d).toString(_0x1bbb36.enc.Hex);
            _0x3b278f = {
              "sua": this.sua,
              "pp": {
                "p1": this.pin
              },
              "fp": _0x7ad8c9
            };
            _0xced0d1 = "wm0!@w_s#ll1flo(";
          }
        }
      }
    }
    const _0x2b70d6 = _0x1bbb36.AES.encrypt(JSON.stringify(_0x3b278f, null, 2), _0x1bbb36.enc.Utf8.parse(_0xced0d1), {
        "iv": _0x1bbb36.enc.Utf8.parse("0102030405060708"),
        "mode": _0x1bbb36.mode.CBC,
        "padding": _0x1bbb36.pad.Pkcs7
      }).ciphertext.toString(_0x1bbb36.enc.Hex),
      _0x3fe00c = _0x17f65b + ";" + _0x7ad8c9 + ";" + _0x25210e + ";" + _0x3f52a7 + ";" + _0x2729ee + ";" + _0x33854b + ";" + _0x3272e5.getTime() + ";" + _0x2b70d6;
    let _0xfe7a68 = {
      "functionId": _0x22360c,
      "body": _0x5306bf,
      "appid": _0x4e6761,
      "client": _0x5c6cb1,
      "clientVersion": _0x510d39,
      "h5st": _0x3fe00c,
      "t": _0x24e812
    };
    return _0x24e812 == null && delete _0xfe7a68.t, _0x5c6cb1 == null && delete _0xfe7a68.client, (_0x510d39 == null && delete _0xfe7a68.clientVersion, _0xfe7a68);
  }
}
class _0x23f6b4 {
  constructor() {}
  static #get_uuid(_0x15539f = 40) {
    if (_0x15539f === 0) return "0";else {
      const _0x1ad0bd = this.#get_uuid(_0x15539f - 1).replace(/^0+/, ""),
        _0x2be6ed = "0123456789abcdef";
      return _0x1ad0bd + _0x2be6ed[Math.floor(Math.random() * (_0x2be6ed.length - 6))];
    }
  }
  static #_md5(_0x377fab) {
    const _0x59c9ba = _0x1bbb36.MD5(_0x377fab);
    return _0x59c9ba.toString(_0x1bbb36.enc.Hex);
  }
  static #sub_v2(_0x2f5915) {
    const _0x457c29 = [55, 146, 68, 104, 165, 61, 204, 127, 187, 15, 217, 136, 238, 154, 233, 90],
      _0x17f66c = Buffer.from("80306f4370b39fd5630ad0529f77adb6", "utf-8");
    let _0x1a5dba = new Array(_0x17f66c.length).fill(0);
    for (let _0x28c809 in _0x2f5915) {
      let _0x5a1955 = Number(_0x2f5915[_0x28c809]),
        _0x5ad6a5 = _0x457c29[_0x28c809 & 15],
        _0x5dfb9c = Number(_0x17f66c[_0x28c809 & 7]);
      _0x5a1955 = _0x5ad6a5 ^ _0x5a1955;
      _0x5a1955 = _0x5a1955 ^ _0x5dfb9c;
      _0x5a1955 = _0x5a1955 + _0x5ad6a5;
      _0x5ad6a5 = _0x5ad6a5 ^ _0x5a1955;
      let _0x3e5b4a = Number(_0x17f66c[_0x28c809 & 7]);
      _0x5ad6a5 = _0x5ad6a5 ^ _0x3e5b4a;
      _0x1a5dba[_0x28c809] = _0x5ad6a5 & 255;
    }
    return _0x1a5dba;
  }
  static #getSign(_0x3278e0, _0x38afc9, _0x15f404, _0x2548d6, _0x7851fd) {
    let _0x17b6d0 = Date.now().toString(),
      _0x184af0 = [[0, 2], [1, 1], [2, 0]],
      _0x21ddd3 = _0x184af0[Math.floor(Math.random() * _0x184af0.length)],
      _0x22cb04 = "1" + _0x21ddd3[0] + _0x21ddd3[1],
      _0x2a8ac6 = "functionId=" + _0x3278e0 + "&body=" + _0x38afc9 + "&openudid=" + _0x15f404 + "&client=" + _0x2548d6 + "&clientVersion=" + _0x7851fd + "&st=" + _0x17b6d0 + "&sv=" + _0x22cb04,
      _0x5c96f9 = this.#sub_v2(Buffer.from(_0x2a8ac6, "utf-8")),
      _0x94905b = this.#_md5(Buffer.from(_0x5c96f9).toString("base64"));
    return [_0x17b6d0, _0x22cb04, _0x94905b];
  }
  static ["getSignData"](_0x182f08, _0x511ef2, _0xe5c5e9) {
    _0x511ef2 = JSON.stringify(_0x511ef2);
    const {
      screen: _0x24f506,
      tf: _0x211737,
      iv: _0x1fd9e6,
      clientVersion: _0x245a13,
      build: _0x112fcf,
      uuid: _0x19efcf
    } = _0xe5c5e9;
    let _0x6d91ec = "apple",
      _0xe6884d = this.#getSign(_0x182f08, _0x511ef2, _0x19efcf, _0x6d91ec, _0x245a13),
      _0x2fbd76 = _0xe6884d[0],
      _0x153565 = _0xe6884d[1],
      _0x4e8b0d = _0xe6884d[2];
    const _0xa7231 = {
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": Math.floor(Date.now() / 1000),
        "ridx": -1,
        "cipher": {
          "screen": this.#base64Encode(_0x24f506),
          "uuid": this.#base64Encode(_0x19efcf),
          "osVersion": this.#base64Encode(_0x1fd9e6),
          "openudid": this.#base64Encode(_0x19efcf),
          "area": this.#base64Encode(this.#generateRandomString(2, "123456789") + "_" + this.#generateRandomString(4, "123456789") + "_" + this.#generateRandomString(4, "123456789") + "_" + this.#generateRandomString(4, "123456789"))
        },
        "ciphertype": 5,
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile"
      },
      _0x16cbd0 = "eidAd71c8121f9s8+" + this.#generateRandomString(20) + "fqJmY9A07YRSnQkMEOU2Z7Jq3GnZeeGG0FqhUU0MoA1PiifL5yWcPJxtp1Cb/b/GsK0GqxuDyDfYZx6";
    return {
      "functionId": _0x182f08,
      "body": _0x511ef2,
      "build": _0x112fcf,
      "client": _0x6d91ec,
      "clientVersion": _0x245a13,
      "d_brand": "apple",
      "d_model": "iPhone" + _0x211737,
      "st": _0x2fbd76,
      "sv": _0x153565,
      "sign": _0x4e8b0d,
      "ef": 1,
      "ep": JSON.stringify(_0xa7231),
      "eid": _0x16cbd0,
      "joycious": 73,
      "partner": "apple",
      "lang": "zh_CN",
      "networkType": "wifi",
      "networklibtype": "JDNetworkBaseAF",
      "ext": JSON.stringify({
        "prstate": "0",
        "pvcStu": "1"
      }),
      "uemps": "0-0-2"
    };
  }
  static #generateRandomString(_0x4c5b86, _0x3d46c3 = null) {
    const _0x496370 = _0x3d46c3 == null ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" : _0x3d46c3;
    let _0x776828 = "";
    for (let _0x21da07 = 0; _0x21da07 < _0x4c5b86; _0x21da07++) {
      const _0x52e65c = Math.floor(Math.random() * _0x496370.length);
      _0x776828 += _0x496370.charAt(_0x52e65c);
    }
    return _0x776828;
  }
  static #base64Encode(_0x33f49f) {
    const _0x1b0819 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      _0x1d7b99 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      _0x3edce1 = _0x23d56b.encode(_0x33f49f),
      _0x321f6f = _0x3edce1.split("").map(_0x17cb59 => {
        const _0x47f645 = _0x1b0819.indexOf(_0x17cb59);
        return _0x47f645 !== -1 ? _0x1d7b99[_0x47f645] : _0x17cb59;
      }).join("");
    return _0x321f6f;
  }
}
class _0x3caf61 {
  static ["activity"] = {};
  static ["msg"] = [];
  static ["proxyIp"] = null;
  static ["proxyIpTime"] = null;
  static ["accounts"] = [];
  static ["addressList"] = [];
  static ["isSaveAddress"] = false;
  constructor(_0x41f5fc, _0x4860a9) {
    Object.assign(this, _0x536960.activity);
    this.cookie = _0x4860a9;
    this.savedCookies = {};
    this.ticket = "";
    this.index = _0x41f5fc;
    this.pin = this.userPin(_0x4860a9);
    this.remarks = "";
    this.tg_id = "";
    this.address = null;
    this.phoneInfo = _0x44bf5f.generatePhoneInfo();
    this.ua = this.userAgent();
    this.headers = {
      "Cookie": _0x4860a9,
      "User-Agent": this.ua.app
    };
    this.retryCount = _0x412771.retryCount;
    this.proxyRetryCount = _0x412771.proxyRetryCount;
    this.proxyIp = "";
    this.proxyIpTime = null;
    this.lzkjOpenCard = false;
    this.addressInit();
    this.defenseUrls = [];
    this.sendMsg = [];
    this.prizeList = [];
    this.canNotOpenCard = false;
    this.needHelp = true;
    this.canHelp = true;
    this.isUse = false;
    this.isInviter = false;
    this.onlyInvite = false;
    this.openCardTypes = _0x412771.openCardTypes;
    this.otherHeaders = {};
    this.h5st = new _0x47f47c(this.headers["User-Agent"], this.pin);
  }
  ["reseInviteStatus"]() {
    this.isUse = false;
    this.canHelp = true;
  }
  ["reseCookieStatus"]() {
    this.canHelp = false;
    this.needHelp = false;
    this.isUse = true;
  }
  ["reseInveterStatus"]() {
    this.isInviter = false;
  }
  ["getActivityId"](_0xb21b2e = this.activityUrl) {
    const _0x258b89 = new URLSearchParams(new URL(_0xb21b2e).search),
      _0x2d0875 = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let _0x1535ce = "";
    for (let _0x22bed1 of _0x2d0875) {
      _0x1535ce = _0x258b89.get(_0x22bed1);
      if (_0x1535ce) break;
    }
    return !_0x1535ce && (_0x1535ce = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, _0xb21b2e)), this.activityId = _0x1535ce, this.activityId;
  }
  ["log"](..._0x534426) {
    _0x2bb6ed(("cookie" + (this.index + 1)).padEnd(_0x536960.paddedStringEndCount, " "), this.remarks || this.pin, ..._0x534426);
  }
  ["debug"](..._0x30e560) {
    (_0x3e16c8.mode || _0x3e16c8.showDebugInfo === 1) && _0x2bb6ed(("cookie" + (this.index + 1)).padEnd(_0x536960.paddedStringEndCount, " "), this.remarks || this.pin, "[Debug]", ..._0x30e560);
  }
  ["putMsg"](_0x3144c7, _0x5cb44d = false) {
    if (!_0x3144c7) return;
    _0x3144c7 += "";
    this.log(_0x3144c7);
    let _0x2845a8 = [[" ", ""], ["优惠券", "券"], ["东券", "券"], ["店铺", ""], ["恭喜", ""], ["获得", ""]];
    for (let _0x469ca6 of _0x2845a8) {
      _0x3144c7 = _0x3144c7.replace(_0x469ca6[0], _0x469ca6[1]);
    }
    if (!_0x3144c7) return;
    this.sendMsg.push(_0x3144c7);
  }
  ["union"](_0xecd1b8, _0x43e030) {
    return _0xecd1b8.concat(_0x43e030.filter(_0x31264c => !_0xecd1b8.includes(_0x31264c)));
  }
  ["intersection"](_0xc80cab, _0x2a2e76) {
    return _0xc80cab.filter(_0x186366 => _0x2a2e76.includes(_0x186366));
  }
  ["different"](_0x1e47ae, _0x2e2d84) {
    return _0x1e47ae.concat(_0x2e2d84).filter(_0x11300e => _0x1e47ae.includes(_0x11300e) && !_0x2e2d84.includes(_0x11300e));
  }
  ["unique"](_0xa0de6c) {
    return Array.from(new Set(_0xa0de6c));
  }
  ["formatDate"](_0x5e6abe, _0x2ea25a) {
    return _0x2dbcae(typeof _0x5e6abe === "object" ? _0x5e6abe : new Date(typeof _0x5e6abe === "string" ? _0x5e6abe * 1 : _0x5e6abe), _0x2ea25a || "yyyy-MM-dd");
  }
  ["dateStringToTimestamp"](_0x249ac3, _0x2f0147) {
    const _0x519606 = parse(_0x249ac3, _0x2f0147 || "yyyy-MM-dd HH:mm", new Date()),
      _0x1c12f8 = _0x519606.getTime();
    return _0x1c12f8;
  }
  ["match"](_0x2cb3e0, _0x526e30) {
    _0x2cb3e0 = _0x2cb3e0 instanceof Array ? _0x2cb3e0 : [_0x2cb3e0];
    for (let _0x474687 of _0x2cb3e0) {
      const _0x9cb2f6 = _0x474687.exec(_0x526e30);
      if (_0x9cb2f6) {
        const _0x2e8ca1 = _0x9cb2f6.length;
        if (_0x2e8ca1 === 1) return _0x9cb2f6;else {
          if (_0x2e8ca1 === 2) {
            return _0x9cb2f6[1];
          } else {
            const _0x2349da = [];
            for (let _0x7a2346 = 1; _0x7a2346 < _0x2e8ca1; _0x7a2346++) {
              _0x2349da.push(_0x9cb2f6[_0x7a2346]);
            }
            return _0x2349da;
          }
        }
      }
    }
    return "";
  }
  ["matchAll"](_0x2a2303, _0x209052) {
    _0x2a2303 = _0x2a2303 instanceof Array ? _0x2a2303 : [_0x2a2303];
    let _0x507acb,
      _0x26c605 = [];
    for (let _0x2acfd4 of _0x2a2303) {
      while ((_0x507acb = _0x2acfd4.exec(_0x209052)) != null) {
        let _0x1a75aa = _0x507acb.length;
        if (_0x1a75aa === 1) _0x26c605.push(_0x507acb);else {
          if (_0x1a75aa === 2) {
            _0x26c605.push(_0x507acb[1]);
          } else {
            let _0x2e86fd = [];
            for (let _0x44dc4b = 1; _0x44dc4b < _0x1a75aa; _0x44dc4b++) {
              _0x2e86fd.push(_0x507acb[_0x44dc4b]);
            }
            _0x26c605.push(_0x2e86fd);
          }
        }
      }
    }
    return _0x26c605;
  }
  ["haskey"](_0x341378, _0x30648c) {
    const _0x112105 = _0x30648c.split(".");
    let _0x2602a5 = _0x341378;
    for (const _0x449e6c of _0x112105) {
      if (_0x2602a5 && _0x2602a5.hasOwnProperty(_0x449e6c)) _0x2602a5 = _0x2602a5[_0x449e6c];else return undefined;
    }
    return _0x2602a5;
  }
  ["parseJSON"](_0x286082) {
    try {
      const _0x5bfa25 = JSON.parse(_0x286082);
      return _0x5bfa25;
    } catch (_0x1f758d) {
      return false;
    }
  }
  ["json2Str"](_0x5618f5) {
    try {
      return JSON.stringify(_0x5618f5);
    } catch (_0x5b5500) {
      return "";
    }
  }
  ["str2Json"](_0x4fff27) {
    try {
      return JSON.parse(_0x4fff27);
    } catch (_0x3f6e3a) {
      return _0x4fff27;
    }
  }
  ["textToHtml"](_0x54f813) {
    return _0x105fa7.load(_0x54f813);
  }
  ["encodeChineseParamsInUrl"](_0x456a67) {
    const _0x4544fe = _0x53d16c.parse(_0x456a67, true);
    let _0x363368 = _0x4544fe.query || {};
    (typeof _0x363368 !== "object" || Array.isArray(_0x363368)) && (_0x363368 = {});
    const _0x3f9780 = {};
    Object.keys(_0x363368).forEach(_0xa55efc => {
      const _0x5b6945 = _0x363368[_0xa55efc];
      typeof _0x5b6945 === "string" && /[\u4e00-\u9fa5]/.test(_0x5b6945) ? _0x3f9780[_0xa55efc] = encodeURIComponent(_0x5b6945) : _0x3f9780[_0xa55efc] = _0x5b6945;
    });
    const _0xc47fd9 = Object.keys(_0x3f9780).map(_0x467026 => encodeURIComponent(_0x467026) + "=" + _0x3f9780[_0x467026]).join("&");
    let _0x51a9f3 = _0x4544fe.protocol + "//" + _0x4544fe.host + _0x4544fe.pathname;
    return _0xc47fd9 && (_0x51a9f3 += "?" + _0xc47fd9), _0x51a9f3;
  }
  ["encodeChineseParams"](_0x33a638) {
    const _0x2c2f05 = new URL(_0x33a638),
      _0x28cb77 = new URLSearchParams(_0x2c2f05.search);
    for (const [_0x38c1dd, _0x1950df] of _0x28cb77) {
      /[\u4e00-\u9fa5]/.test(_0x1950df) && _0x28cb77.set(_0x38c1dd, encodeURIComponent(_0x1950df));
    }
    return _0x2c2f05.search = _0x28cb77.toString(), _0x2c2f05.toString();
  }
  ["sleep"](_0x766863, _0x2504c4) {
    let _0x6c782e = _0x766863;
    return _0x2504c4 !== undefined && (_0x6c782e = Math.floor(Math.random() * (_0x2504c4 - _0x766863 + 1)) + _0x766863), new Promise(_0x2b5604 => setTimeout(_0x2b5604, _0x6c782e));
  }
  ["wait"](_0x4d0061, _0x5892eb) {
    if (_0x4d0061 < 0) return;
    if (_0x5892eb) return new Promise(_0x84b90 => setTimeout(_0x84b90, this.random(_0x4d0061, _0x5892eb)));else {
      return new Promise(_0xd22925 => setTimeout(_0xd22925, _0x4d0061));
    }
  }
  ["stop"]() {
    this.immediatelyExit();
    throw new _0x112afa();
  }
  async ["immediatelyExit"]() {
    if (_0x412771.immediatelyExit === 1) {
      while (_0x3caf61.isSaveAddress) {
        await this.sleep(1000);
      }
      process.exit(0);
    }
  }
  ["exit"]() {
    throw new _0xc186c5();
  }
  ["random"](_0x462a79, _0x3d32f6) {
    return Math.min(Math.floor(_0x462a79 + Math.random() * (_0x3d32f6 - _0x462a79)), _0x3d32f6);
  }
  ["randomNum"](_0x31e3d3) {
    _0x31e3d3 = _0x31e3d3 || 32;
    let _0x41d56a = "0123456789",
      _0x44f8c1 = _0x41d56a.length,
      _0xe7ea0a = "";
    for (let _0x4050d0 = 0; _0x4050d0 < _0x31e3d3; _0x4050d0++) {
      _0xe7ea0a += _0x41d56a.charAt(Math.floor(Math.random() * _0x44f8c1));
    }
    return _0xe7ea0a;
  }
  ["randomArray"](_0xa23bc7, _0x58425f) {
    _0x58425f = _0x58425f || _0xa23bc7.length;
    let _0x28528b = _0xa23bc7.slice(0),
      _0x39e015 = _0xa23bc7.length,
      _0x3bf4a4 = _0x39e015 - _0x58425f,
      _0x2a5f24,
      _0x75ccd8;
    while (_0x39e015-- > _0x3bf4a4) {
      _0x75ccd8 = Math.floor((_0x39e015 + 1) * Math.random());
      _0x2a5f24 = _0x28528b[_0x75ccd8];
      _0x28528b[_0x75ccd8] = _0x28528b[_0x39e015];
      _0x28528b[_0x39e015] = _0x2a5f24;
    }
    return _0x28528b.slice(_0x3bf4a4);
  }
  ["timestamp"]() {
    return Date.now();
  }
  ["getQueryString"](_0x210504, _0x3d87dd) {
    let _0x23fd88 = new RegExp("(^|[&?])" + _0x3d87dd + "=([^&]*)(&|$)"),
      _0xfd6744 = _0x210504.match(_0x23fd88);
    if (_0xfd6744 != null) return unescape(_0xfd6744[2]);
    return "";
  }
  ["readFileSync"](_0x164992) {
    try {
      return _0x5392c3.readFileSync(_0x164992, "utf-8").toString();
    } catch (_0xfbc214) {
      return "";
    }
  }
  ["writeFileSync"](_0x50b4c0, _0x24d003, _0x515599) {
    const _0x59c23b = _0x37f2ea.join(__dirname, _0x50b4c0);
    if (!_0x5392c3.existsSync(_0x59c23b)) {
      _0x5392c3.mkdirSync(_0x59c23b);
    }
    const _0x56c8db = _0x37f2ea.join(_0x59c23b, _0x24d003);
    try {
      _0x5392c3.writeFileSync(_0x56c8db, _0x515599, "utf-8");
    } catch (_0x574739) {
      this.log("写入文件时出错：", _0x574739);
    }
  }
  ["readYamlSync"](_0x4a0ad5) {
    try {
      return _0x1f240b.parse(this.readFileSync(_0x4a0ad5)) ?? {};
    } catch (_0x155e54) {
      return {};
    }
  }
  ["writeYamlSync"](_0x1c4b16, _0x2c2701, _0x13b1ea) {
    try {
      this.writeFileSync(_0x1c4b16, _0x2c2701, _0x1f240b.stringify(_0x13b1ea));
    } catch (_0x4a5c9f) {
      this.log("写入文件时出错：", _0x4a5c9f);
    }
  }
  ["appendFileSync"](_0x4505f8, _0x5603dc, _0x1b3eb9) {
    const _0x242673 = _0x37f2ea.join(__dirname, _0x4505f8);
    !_0x5392c3.existsSync(_0x242673) && _0x5392c3.mkdirSync(_0x242673);
    const _0x305dc5 = _0x37f2ea.join(_0x242673, _0x5603dc);
    try {
      _0x5392c3.appendFileSync(_0x305dc5, _0x1b3eb9, "utf-8");
    } catch (_0xa66587) {
      this.log("写入文件时出错：", _0xa66587);
    }
  }
  ["md5"](_0x3ed6fe) {
    const _0x4343a2 = _0x1bbb36.MD5(_0x3ed6fe);
    return _0x4343a2.toString(_0x1bbb36.enc.Hex);
  }
  ["hmacSHA256"](_0x530d7e, _0x281006) {
    const _0x3468ad = _0x1bbb36.HmacSHA256(_0x281006, _0x530d7e);
    return _0x3468ad.toString(_0x1bbb36.enc.Hex);
  }
  ["hmacMD5"](_0x2e0ffb, _0x1787f1) {
    const _0x250523 = _0x1bbb36.HmacMD5(_0x1787f1, _0x2e0ffb);
    return _0x250523.toString(_0x1bbb36.enc.Hex);
  }
  ["rsaEncrypt"](_0x5f52ae, _0x3cf77e, _0x2f0d9e) {
    _0x5f52ae = "-----BEGIN PUBLIC KEY-----\n" + _0x5f52ae + "\n-----END PUBLIC KEY-----";
    const _0x164ff7 = new _0x56f54e(_0x5f52ae);
    _0x164ff7.setOptions(_0x3cf77e);
    const _0x11b0da = _0x164ff7.encrypt(_0x2f0d9e, "base64");
    return _0x11b0da;
  }
  ["encryptCrypto"](_0x29f4af, _0x5437aa, _0x38e924, _0xaa094c, _0x246924, _0x5d4a46, _0x5f5a81 = false) {
    return _0x1bbb36[_0x29f4af].encrypt(_0x1bbb36.enc.Utf8.parse(_0x246924), _0x1bbb36.enc.Utf8.parse(_0x5d4a46), {
      "mode": _0x1bbb36.mode[_0x5437aa],
      "padding": _0x1bbb36.pad[_0x38e924],
      "iv": _0x1bbb36.enc.Utf8.parse(_0xaa094c)
    }).ciphertext.toString(_0x5f5a81 ? _0x1bbb36.enc.Hex : _0x1bbb36.enc.Base64);
  }
  ["decryptCrypto"](_0x195f79, _0x4d5005, _0x446534, _0xe44b, _0x13a74f, _0x1d5f17, _0x276f5e = false) {
    const _0x438368 = _0x1bbb36[_0x195f79].decrypt({
      "ciphertext": _0x276f5e ? _0x1bbb36.enc.Hex.parse(_0x13a74f) : _0x1bbb36.enc.Base64.parse(_0x13a74f)
    }, _0x1bbb36.enc.Utf8.parse(_0x1d5f17), {
      "iv": _0x1bbb36.enc.Utf8.parse(_0xe44b),
      "mode": _0x1bbb36.mode[_0x4d5005],
      "padding": _0x1bbb36.pad[_0x446534]
    }).toString(_0x1bbb36.enc.Utf8);
    return _0x438368;
  }
  #base64Encode(_0x5b9811) {
    const _0x57eeab = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      _0x1549f4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      _0x5ba345 = _0x1bbb36.enc.Utf8.parse(_0x5b9811),
      _0x52f369 = _0x1bbb36.enc.Base64.stringify(_0x5ba345),
      _0x7a1948 = _0x52f369.split("").map(_0x1dfa55 => {
        const _0x86a6c5 = _0x57eeab.indexOf(_0x1dfa55);
        return _0x86a6c5 !== -1 ? _0x1549f4[_0x86a6c5] : _0x1dfa55;
      }).join("");
    return _0x7a1948;
  }
  ["generateStringArray"](_0x41bcd2, _0x4e493c) {
    const _0x4d23d9 = Array(_0x41bcd2).fill(_0x4e493c),
      _0x3cfaa1 = _0x4d23d9.join("");
    return _0x3cfaa1;
  }
  ["uuid"](_0x118d09 = 40) {
    return _0x1857f7(this.generateStringArray(_0x118d09, "x"));
  }
  ["userAgent"]() {
    const {
        screen: _0x4c205f,
        tf: _0xe395c8,
        iv: _0x49190c,
        clientVersion: _0x38b44a,
        build: _0x2f3361,
        uuid: _0x21ca5b
      } = this.phoneInfo,
      _0x2e158d = {
        "ciphertype": 5,
        "cipher": {
          "ud": this.#base64Encode(_0x21ca5b),
          "sv": this.#base64Encode(_0xe395c8),
          "iad": ""
        },
        "ts": Date.now(),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
      };
    return {
      "jd4": "JD4iPhone/" + _0x2f3361 + "%20(iPhone;%20iOS;%20Scale/3.00);jdmall;iphone;version/" + _0x38b44a + ";build/" + _0x2f3361 + ";network/wifi;screen/" + _0x4c205f.replace("*", "x") + ";os/" + _0x49190c,
      "app": "jdapp;iPhone;" + _0x38b44a + ";;;M/5.0;appBuild/" + _0x2f3361 + ";jdSupportDarkMode/1;ef/1;ep/" + encodeURIComponent(JSON.stringify(_0x2e158d)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + _0x49190c.replaceAll(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"
    };
  }
  ["jdJE"]() {
    const {
        build: _0x50ae27
      } = this.phoneInfo,
      _0x3b83fd = {
        "ciphertype": 5,
        "cipher": {
          "pin": this.#base64Encode(this.pin)
        },
        "ts": parseInt(this.timestamp() / 1000),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
      },
      _0x14a866 = {
        "ciphertype": 5,
        "cipher": {
          "User-Agent": "JD4iPhone/" + _0x50ae27 + "%20(iPhone;%20iOS;%20Scale/3.00)"
        },
        "ts": parseInt(this.timestamp() / 1000),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
      };
    return {
      "j-e-c": encodeURIComponent(JSON.stringify(_0x3b83fd)),
      "j-e-h": encodeURIComponent(JSON.stringify(_0x14a866))
    };
  }
  ["userPin"](_0x372d12 = this.cookie) {
    if (!_0x372d12) return;
    const _0x2903ef = _0x372d12.split(";");
    for (const _0x4fec63 of _0x2903ef) {
      const [_0x53ccb2, _0x2707b9] = _0x4fec63.split("=");
      if (_0x53ccb2 === "pt_pin") return _0x2707b9;
    }
    return null;
  }
  ["getCookieByName"](_0x50cda9) {
    return this.savedCookies[_0x50cda9];
  }
  ["handleSetCookieHeaders"](_0x8a576d) {
    let _0x1434fe = {};
    const _0x2981aa = _0x8a576d["set-cookie"];
    _0x2981aa && _0x2981aa.forEach(_0x5b267e => {
      const _0x37769a = _0x5b267e.match(/([^=]+)(?:=([^;]*))?/);
      if (_0x37769a) {
        const _0x44be37 = _0x37769a[1].trim(),
          _0x1814ef = _0x37769a[2] ? _0x37769a[2].trim() : "";
        _0x1434fe[_0x44be37] = _0x1814ef;
      }
    });
    this.savedCookies = {
      ...this.savedCookies,
      ..._0x1434fe
    };
    this.ticket = "";
    Object.entries(this.savedCookies).forEach(([_0x2c9541, _0x57e1f9]) => {
      this.ticket += _0x2c9541 + "=" + _0x57e1f9 + ";";
    });
  }
  #handleHeaders(_0x3b81f3) {
    if (this.mode === "hdb") {
      if (!_0x3b81f3._s) return;
      let _0xd6d7f1 = {
        "nonce": _0x3b81f3._nonce ?? "",
        "s": _0x3b81f3._s ?? "",
        "ts": _0x3b81f3._ts ?? ""
      };
      this.otherHeaders = {
        ...this.otherHeaders,
        ..._0xd6d7f1
      };
    }
  }
  ["request"](_0x1f24b9) {
    const _0x267146 = {
        "method": "get",
        "timeout": 20000
      },
      _0x152776 = Object.assign({}, _0x267146, _0x1f24b9);
    return new Promise((_0xcfa024, _0x35da08) => {
      _0x5df805(_0x152776).then(_0x3a3eb6 => {
        const _0x1a3cbc = _0x3a3eb6.data,
          _0x4675e1 = _0x3a3eb6.headers;
        _0xcfa024({
          "data": _0x1a3cbc,
          "headers": _0x4675e1
        });
      }).catch(_0x13141d => {
        _0x35da08(_0x13141d);
      });
    });
  }
  async #checkProxy(_0x18276d) {
    try {
      return await _0x5df805({
        "url": this.activityUrl || "https://www.jd.com",
        "headers": {
          "User-Agent": this.ua.app
        },
        "httpsAgent": _0x18276d,
        "timeout": 4000
      }), true;
    } catch (_0xee885c) {
      return false;
    }
  }
  async #getProxyIp(_0x4bee12 = 10) {
    if (!_0x536960.proxy.proxyState) return null;
    if (_0x412771.wxProxyMode === 1) {
      if (_0x3caf61.proxyIp && _0x3caf61.proxyIpTime + _0x412771.wxProxyInterval * 1000 > this.timestamp()) {
        return _0x3caf61.proxyIp;
      }
      let _0x31a463 = await _0x536960.proxy.getCurrentProxy();
      if (!_0x31a463) return null;
      return _0x3caf61.proxyIp = _0x31a463, _0x3caf61.proxyIpTime = this.timestamp(), _0x31a463;
    } else {
      if (_0x412771.wxProxyMode === 2) {
        if (this.proxyIp && this.proxyIpTime + _0x412771.wxProxyInterval * 1000 > this.timestamp()) return this.proxyIp;
        let _0x225ba0 = await _0x536960.proxy.getCurrentProxy();
        if (!_0x225ba0) return null;
        return this.log("获取到的ip:" + _0x225ba0), this.proxyIp = _0x225ba0, this.proxyIpTime = this.timestamp(), _0x225ba0;
      } else this.log("代理模式错误");
    }
    return null;
  }
  async #handleRequestParams(_0xc18ee6) {
    const _0x56db69 = {
      ...this.headers
    };
    !_0xc18ee6?.["noReferer"] && this.activityUrl && (_0x56db69.Referer = this.activityUrl);
    const _0x3fa997 = {
      "url": "https://api.m.jd.com/",
      "method": "get",
      "headers": {
        ..._0x56db69,
        ..._0xc18ee6?.["headers"],
        ...this.otherHeaders
      },
      "timeout": _0x412771.timeoutDuration * 1000
    };
    delete _0xc18ee6.headers;
    _0xc18ee6 = Object.assign({}, _0x3fa997, _0xc18ee6);
    this.haskey(_0xc18ee6, "api") && (_0xc18ee6.url += _0xc18ee6.api);
    if (this.haskey(_0xc18ee6, "json")) _0xc18ee6.data = _0xc18ee6.json, _0xc18ee6.headers = {
      ..._0xc18ee6.headers,
      "Content-Type": "application/json;charset=UTF-8"
    }, _0xc18ee6.method = "post";else this.haskey(_0xc18ee6, "data") && (_0xc18ee6.headers = {
      ..._0xc18ee6.headers,
      "Content-Type": "application/x-www-form-urlencoded"
    }, _0xc18ee6.method = "post");
    const _0x545a83 = _0xc18ee6?.["functionId"] || "",
      _0x347cff = _0xc18ee6?.["body"] || "";
    if (this.haskey(_0xc18ee6, "sign")) {
      let _0x4f6870 = _0x23f6b4.getSignData(_0x545a83, _0x347cff, this.phoneInfo);
      if (_0xc18ee6.method == "get") _0xc18ee6.params = Object.assign({}, _0xc18ee6.params, _0x4f6870);else _0xc18ee6.data = Object.assign({}, _0xc18ee6.data, _0x4f6870);
    }
    let _0x3971d3 = false,
      _0x4e4a70;
    if (this.haskey(_0xc18ee6, "h5st31")) _0x3971d3 = true, _0x4e4a70 = "3.1";else {
      if (this.haskey(_0xc18ee6, "h5st41")) _0x3971d3 = true, _0x4e4a70 = "4.1";else {
        if (this.haskey(_0xc18ee6, "h5st42")) _0x3971d3 = true, _0x4e4a70 = "4.2";else {
          if (this.haskey(_0xc18ee6, "h5st43")) {
            _0x3971d3 = true;
            _0x4e4a70 = "4.3";
          } else this.haskey(_0xc18ee6, "h5st44") && (_0x3971d3 = true, _0x4e4a70 = "4.4");
        }
      }
    }
    if (_0x3971d3) {
      let _0x169850 = await this.h5st.encrypt(_0xc18ee6.appId, _0xc18ee6.functionId, _0xc18ee6.body, _0xc18ee6.appid, _0xc18ee6.client, _0xc18ee6.clientVersion, _0xc18ee6.t, _0x4e4a70);
      _0xc18ee6.method == "get" ? _0xc18ee6.params = Object.assign({}, _0xc18ee6.params, _0x169850) : _0xc18ee6.data = Object.assign({}, _0xc18ee6.data, _0x169850);
    }
    _0xc18ee6 = this.#checkAndEncryptParameters(_0xc18ee6);
    _0xc18ee6?.["headers"]["Content-Type"] === "application/x-www-form-urlencoded" && (_0xc18ee6.data = _0x29a336.stringify(_0xc18ee6.data));
    _0xc18ee6?.["jdje"] && (_0xc18ee6.headers = {
      ..._0xc18ee6.headers,
      ...this.jdJE(),
      "x-referer-package": "com.360buy.jdmobile",
      "x-rp-client": "ios_4.0.0"
    });
    _0xc18ee6?.["headers"]?.["Referer"] && (_0xc18ee6.headers.Referer = this.encodeChineseParamsInUrl(_0xc18ee6.headers.Referer));
    let _0x4e95ae = {
      "url": _0xc18ee6.url,
      "method": _0xc18ee6.method,
      "params": _0xc18ee6?.["params"] || {},
      "data": _0xc18ee6?.["data"] || {},
      "headers": _0xc18ee6?.["headers"] || {},
      "timeout": _0xc18ee6?.["timeout"] || 30000,
      "maxRedirects": _0xc18ee6?.["maxRedirects"] || 5
    };
    if (!_0xc18ee6?.["noUseProxy"]) {
      const _0x1cfe7d = _0x4e95ae.url.includes("https://") && _0x4e95ae.url.includes("api.m.jd.com") ? _0x3e16c8.jdAppTlsOptions : {},
        _0x551797 = await this.#getProxyIp();
      _0x4e95ae.httpsAgent = _0x1865bf({
        "proxy": _0x551797 ? "http://" + _0x551797 : null,
        "tlsOptions": _0x1cfe7d
      });
    }
    return _0x4e95ae;
  }
  #tlsOptions(_0x21ae46, _0x1ff583 = false) {
    !_0x1ff583 && _0x21ae46?.["url"]["includes"]("https") && _0x21ae46?.["url"]?.["includes"]("api.m.jd.com") && (_0x175d1b.globalAgent = new _0x175d1b.Agent(tlsOptions));
    _0x1ff583 && _0x175d1b.globalAgent.options && Object.keys(tlsOptions).forEach(_0x4524dc => delete _0x175d1b.globalAgent.options[_0x4524dc]);
  }
  #checkAndEncryptParameters(_0x2309ee) {
    if (this.defenseUrls.some(_0x332df2 => _0x2309ee.url.includes(_0x332df2))) {
      if (this.mode === "wx") _0x2309ee.data = {
        "ecyText": _0x17e2bb({
          ..._0x2309ee.data,
          "actId": this.activityId
        }, this.getCookieByName("pToken"), this.getCookieByName("te"))
      }, _0x2309ee.headers["Content-Type"] = "application/json;charset=UTF-8";else this.mode === "100" && (_0x2309ee.data.actId = this.activityId, _0x2309ee.data = {
        "ecyText": _0x17e2bb(_0x2309ee.data, this.getCookieByName("pToken"), this.getCookieByName("te"))
      });
    }
    if (this.mode == "hdb" && _0x2309ee.method === "post" && _0x3e16c8.hdbTypes.some(_0x397a94 => _0x2309ee.url.includes(_0x397a94))) {
      _0x2309ee.data.sysParams = {
        "sysmethod": _0x2309ee.data.appJsonParams.method,
        "sign": "111111",
        "timestamp": 123456
      };
    }
    return _0x2309ee;
  }
  async #proxyRequiredCheck(_0x1b39d0, _0x39213e) {
    if (_0x412771.wxProxyEnable === 2 && _0x412771.wxProxyUrl && _0x1b39d0.match(_0x412771.proxyRegx)) {
      if (_0x412771.wxProxyMode === 1 && _0x3caf61.proxyIp && _0x3caf61.proxyIpTime && _0x39213e && _0x39213e < _0x3caf61.proxyIpTime) return true;
      this.proxyIp = null;
      _0x3caf61.proxyIp = null;
      _0x412771.wxProxySmart === 1 && _0x536960.proxy.updateProxyEnable(true);
      if (await _0x536960.proxy.setCurrentProxy()) return true;
    }
    return false;
  }
  #handleMatchingResponse(_0x4ea186) {
    if (_0x4ea186 && _0x4ea186.constructor === Object) {
      _0x4ea186 = JSON.stringify(_0x4ea186);
      _0x4ea186.includes("AUTH.FAILED.BLACK") && (this.black = true, this.putMsg("AUTH BLACK"), this.reseCookieStatus(), this.exit());
      if (_0x4ea186.match(_0x412771.reTryRegx) && !_0x4ea186.includes("AUTH.FAILED.BLACK")) return true;
    }
    return false;
  }
  #retryOnEmptyStringResponse(_0x2fc408, _0x2275a4) {
    if (!_0x2275a4 && this.defenseUrls.some(_0x1d0c64 => _0x2fc408.url.includes(_0x1d0c64))) return true;
    return false;
  }
  async ["jd_api"](_0x23a86d, _0x183561 = true, _0x58d210 = 0, _0x340faa = 0) {
    let _0x30c56f = Object.assign({}, _0x23a86d),
      _0x2cb741 = _0x23a86d?.["functionId"],
      _0x2f0bc6 = await this.#handleRequestParams(_0x23a86d),
      _0x1707ad = this.timestamp();
    try {
      let {
        data: _0x54efca,
        headers: _0x3729e0
      } = await this.request(_0x2f0bc6);
      _0x183561 && this.handleSetCookieHeaders(_0x3729e0);
      this.#handleHeaders(_0x3729e0);
      if (_0x58d210 < 10 && this.#retryOnEmptyStringResponse(_0x2f0bc6, _0x54efca)) return this.log("空数据重试" + _0x58d210), await this.initPinToken(), await this.jd_api(_0x30c56f, true, _0x58d210 + 1, _0x340faa);
      if (_0x58d210 < this.retryCount && this.#handleMatchingResponse(_0x54efca)) return this.debug(_0x54efca), this.log("重试" + _0x58d210), await this.jd_api(_0x30c56f, true, _0x58d210 + 1, _0x340faa);
      let _0x1a7ecc = this.json2Str(_0x54efca);
      if (_0x58d210 < this.retryCount && _0x54efca && _0x1a7ecc && /您点的太快了|操作过于频繁/.exec(_0x1a7ecc)) return this.debug(_0x54efca), this.log("等待重试" + _0x58d210), await this.sleep(1500), await this.jd_api(_0x30c56f, true, _0x58d210 + 1, _0x340faa);
      return _0x54efca;
    } catch (_0x31efed) {
      if (_0x31efed instanceof _0x112afa || _0x31efed instanceof _0xc186c5) throw _0x31efed;
      if (_0x23a86d?.["maxRedirects"] === 0 && _0x183561 && [301, 302].includes(_0x31efed?.["response"]?.["status"])) return this.handleSetCookieHeaders(_0x31efed?.["response"]?.["headers"]), _0x31efed?.["response"]?.["headers"];
      if (this.blackRegx?.["exec"](_0x31efed?.["response"]?.["status"])) return this.putMsg(_0x31efed.response?.["data"]?.["message"] || "黑号"), this.exit();
      this.debug(_0x31efed.response?.["data"]);
      const _0x5c61fa = _0x31efed.message;
      if (_0x31efed?.["response"]?.["status"] === 404 && _0x23a86d?.["url"]?.["includes"]("getDefenseUrls")) return [];
      if (_0x31efed?.["response"]?.["status"] === 500 && this.defenseUrls.some(_0x295ae0 => _0x2f0bc6.url.includes(_0x295ae0)) && _0x58d210 < this.retryCount) {
        return await this.initPinToken(), await this.jd_api(_0x30c56f, true, _0x58d210 + 1, _0x340faa);
      }
      let _0x35563b = _0x2cb741?.["includes"]("isvObfuscator");
      if (_0x35563b && _0x340faa > _0x412771.isvObfuscatorRetry) return undefined;
      if (_0x340faa < this.proxyRetryCount && (await this.#proxyRequiredCheck(_0x5c61fa, _0x1707ad))) return _0x412771.showProxyRetryLog && this.log("" + (_0x35563b ? "isvObfuscator " : "") + (_0x31efed?.["response"]?.["status"] ?? "") + "代理重试" + _0x340faa), _0x35563b && (await this.sleep(_0x412771.isvObfuscatorRetryWait * 1000)), await this.jd_api(_0x30c56f, true, _0x58d210, _0x340faa + 1);
      return this.log("[" + (_0x2cb741 ?? _0x30c56f?.["params"]?.["functionId"] ?? _0x30c56f?.["data"]?.["functionId"] ?? _0x30c56f?.["json"]?.["functionId"] ?? _0x23a86d.url?.["split"]("/")?.["pop"]()) + "]重试" + _0x340faa + "次失败, 捕获异常:" + _0x5c61fa), undefined;
    }
  }
  async ["taskGet"](_0x34428b, _0x3a1754 = {}) {
    let _0x385f3c = _0x34428b.startsWith("http") ? _0x34428b : "https://" + this.domain + (this.prefix ? ("/" + this.prefix).replace(/\/\//g, "/") : "") + ("/" + _0x34428b).replace(/\/\//g, "/"),
      _0x1b227a = {
        "url": _0x385f3c,
        "method": "get",
        "params": _0x3a1754,
        "headers": {
          "Referer": this.activityUrl,
          "Cookie": this.isvToken ? "IsvToken=" + this.isvToken + ";" + this.ticket : this.cookie
        }
      };
    return await this.jd_api(_0x1b227a);
  }
  async ["taskPost"](_0x5a5b1a, _0x254047 = {}, _0x5365c5 = {}, _0x4d5cc0 = false) {
    let _0x4ac351 = this.prefix ? (this.domain + "/" + this.prefix + "/" + _0x5a5b1a).replace(/\/\//g, "/") : (this.domain + "/" + _0x5a5b1a).replace(/\/\//g, "/"),
      _0xcdaaa7 = "https://" + _0x4ac351,
      _0x37eb58 = {
        "url": _0xcdaaa7,
        "method": "post",
        "headers": {
          "Referer": this.activityUrl,
          "Cookie": this.isvToken ? "IsvToken=" + this.isvToken + ";" + this.ticket : this.cookie,
          ..._0x5365c5
        }
      };
    return _0x4d5cc0 ? _0x37eb58.json = _0x254047 : _0x37eb58.data = _0x254047, await this.jd_api(_0x37eb58);
  }
  async ["taskPostByJson"](_0x1794f9, _0x50fe68 = {}, _0x14c17d = {}) {
    return await this.taskPost(_0x1794f9, _0x50fe68, _0x14c17d, true);
  }
  ["wxStop"](_0x5bfabc) {
    if (!_0x5bfabc) return;
    for (let _0x1493d4 of _0x412771.stopKeywords) {
      if (_0x5bfabc.includes(_0x1493d4)) throw new _0x112afa("退出");
    }
  }
  async ["wxCommonInfo"](_0x3fce91 = true, _0x5cd08d = 3) {
    let _0x4274da = await this.taskGet(this.activityUrl);
    if (_0x4274da && _0x4274da.includes("活动已经结束") && _0x3fce91) {
      this.putMsg("活动已经结束,手动确认");
      this.stop();
      return;
    }
    (this.domain.includes("lzkj") || this.domain.includes("lzdz1")) && (await this.taskGet("/wxCommonInfo/token"));
    if (!this.ticket.includes("LZ_TOKEN_KEY")) {
      this.debug(this.ticket);
      _0x5cd08d <= 0 && (this.putMsg("初始化LZ_TOKEN_KEY失败"), this.exit());
      this.log("初始化LZ_TOKEN_KEY失败,正在重试...");
      this.ticket = "";
      return await this.wxCommonInfo(_0x3fce91, _0x5cd08d - 1);
    }
  }
  ["addressInit"]() {
    let _0x3e110f = _0x3caf61.accounts;
    if (!_0x3e110f) return;
    _0x3e110f = JSON.parse(_0x3e110f);
    if (_0x3e110f.length === 0) return;
    _0x3caf61.addressList = _0x3e110f;
    for (let _0x12efc7 of _0x3e110f) {
      if (_0x12efc7.pt_pin === this.pin) {
        this.address = _0x12efc7.address;
        this.remarks = _0x12efc7.remarks;
        this.tg_id = _0x12efc7.tg_id;
        return;
      }
    }
  }
  ["getAddress"]() {
    if (this.address) return;
    if (_0x3caf61.addressList.length === 0) {
      this.address = "";
      return;
    }
    const _0x4379bb = _0x2fe774 => _0x2fe774.pt_pin.includes("默认地址"),
      _0x78827f = _0x1b2990 => !_0x1b2990.useNum || _0x1b2990.useNum < _0x412771.addressUseNum || _0x412771.addressUseNum === 0,
      _0x3cdb7b = _0x3caf61.addressList.filter(_0x359c3a => _0x4379bb(_0x359c3a) && _0x78827f(_0x359c3a)),
      _0x3066d8 = _0x3caf61.addressList.filter(_0x17de7b => !_0x4379bb(_0x17de7b) && _0x78827f(_0x17de7b));
    if (_0x3cdb7b.length > 0) {
      const _0x2de86b = Math.floor(Math.random() * _0x3cdb7b.length),
        _0x23eeb7 = _0x3cdb7b[_0x2de86b];
      this.address = _0x23eeb7.address;
      _0x23eeb7.useNum ? _0x23eeb7.useNum += 1 : _0x23eeb7.useNum = 1;
    } else {
      if (_0x3066d8.length > 0) {
        const _0x5cf738 = Math.floor(Math.random() * _0x3066d8.length),
          _0x3f4cd0 = _0x3066d8[_0x5cf738];
        this.address = _0x3f4cd0.address;
        _0x3f4cd0.useNum ? _0x3f4cd0.useNum += 1 : _0x3f4cd0.useNum = 1;
      }
    }
  }
  async ["getShopOpenCardInfo"](_0x479fb5 = this.venderId || this.shopId) {
    let _0xf2b420 = {
        "venderId": _0x479fb5,
        "payUpShop": true,
        "queryVersion": "10.5.2",
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com",
        "channel": "8018006"
      },
      _0x623838 = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "body": _0xf2b420,
        "data": {
          "functionId": "getShopOpenCardInfo",
          "body": _0xf2b420,
          "uuid": "88888"
        },
        "functionId": "getShopOpenCardInfo",
        "headers": {
          "Referer": "https://shop.m.jd.com/"
        },
        "appid": "shopmember_m_jd_com",
        "appId": "27004",
        "clientVersion": "9.2.0",
        "client": "H5",
        "t": Date.now(),
        "h5st43": true
      }, false);
    if (_0x623838 && _0x623838.success) {
      let _0x1a1ede = _0x623838?.["result"][0],
        _0x33d417 = _0x1a1ede?.["interestsRuleList"] ?? [];
      this.openCardStatus = _0x1a1ede?.["userInfo"]?.["openCardStatus"] ?? 0;
      this.giftList = _0x33d417;
      _0x33d417.length > 0 ? this.giftActId = _0x33d417?.[0]?.["interestsInfo"]["activityId"] ?? "" : this.giftActId = "";
    } else {
      this.giftActId = "";
    }
    return _0x623838;
  }
  async ["bindWithVender"](_0x2f8251 = this.venderId || this.shopId) {
    let _0x1c883f = {
        "venderId": _0x2f8251,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": "8018006",
        "activityId": this.giftActId,
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com"
      },
      _0x137257 = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "body": _0x1c883f,
        "data": {
          "functionId": "bindWithVender",
          "appid": "shopmember_m_jd_com",
          "body": _0x1c883f,
          "uuid": "88888"
        },
        "appid": "shopmember_m_jd_com",
        "appId": "27004",
        "functionId": "bindWithVender",
        "headers": {
          "Referer": "https://shop.m.jd.com/"
        },
        "clientVersion": "9.2.0",
        "client": "H5",
        "t": Date.now(),
        "h5st43": true
      }, false);
    this.debug(_0x137257);
    if (_0x137257 && _0x137257.code === 0) {
      if (_0x137257.busiCode === "0") {
        if (_0x137257.result?.["giftInfo"]?.["giftList"]) {
          let _0x53c403 = _0x137257.result.giftInfo.giftList.map(_0x206d3d => "" + _0x206d3d.discountString + _0x206d3d.prizeName).join(",");
          this.log("加入店铺[" + _0x2f8251 + "]会员成功,获得" + _0x53c403);
        } else this.log("加入店铺[" + _0x2f8251 + "]会员成功");
      } else {
        this.log(_0x137257?.["message"]);
        if (_0x137257?.["message"]?.["includes"]("已经是本店会员")) {} else {
          this.canNotOpenCard = true;
        }
      }
    } else this.log("加入店铺[" + _0x2f8251 + "]会员失败", _0x137257?.["message"]), this.canNotOpenCard = true;
    return _0x137257;
  }
  async ["isvObfuscator"]() {
    let _0x514245 = this.readFileSync("./tokens/" + this.pin),
      _0x4c530a = _0x514245 ? JSON.parse(_0x514245) : {};
    if (_0x4c530a && _0x4c530a?.["expireTime"] > this.timestamp() - this.random(0, 2 * 60 * 1000) && _0x4c530a?.["token"]) return this.isvToken = _0x4c530a.token, {
      "code": "0",
      "token": this.isvToken
    };
    const _0x154368 = {
        "url": "https://" + this.domain,
        "id": ""
      },
      _0xbe51a7 = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "functionId": "isvObfuscator",
        "body": _0x154368,
        "data": {},
        "headers": {
          ...this.headers,
          "User-Agent": this.ua.jd4
        },
        "sign": true,
        "noReferer": true,
        "jdje": true
      }, false);
    if (_0xbe51a7 && _0xbe51a7?.["code"] === "0" && _0xbe51a7?.["token"]) {
      let _0x81c87b = _0xbe51a7.token;
      this.isvToken = _0x81c87b;
      this.writeFileSync("tokens", this.pin, JSON.stringify({
        "expireTime": this.timestamp() + this.random(20, 26) * 60 * 1000,
        "token": _0x81c87b
      }));
    } else _0xbe51a7?.["code"] === "3" && _0xbe51a7?.["errcode"] === 264 ? (this.putMsg("ck过期"), this.reseCookieStatus(), this.exit()) : this.log(_0xbe51a7);
    return !this.isvToken && (this.putMsg("获取Token失败"), this.reseCookieStatus(), this.exit()), _0xbe51a7;
  }
  async ["getShopInfo"](_0x35f30f = this.venderId, _0x5eecf8 = this.shopId) {
    if (_0x3caf61.activity.shopName) {
      this.shopName = _0x3caf61.activity.shopName;
      this.venderId = _0x3caf61.activity.venderId;
      this.shopId = _0x3caf61.activity.shopId;
      return;
    }
    let _0x3ad953 = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "getShopHomeBaseInfo",
      "body": {
        "shopId": _0x5eecf8?.["toString"](),
        "source": "app-shop",
        "sourceRpc": "shop_app_home_home",
        "venderId": _0x35f30f?.["toString"]()
      },
      "headers": {
        "User-Agent": this.ua.jd4,
        "jdgs": "-3107",
        "x-rp-client": "ios_4.0.0",
        "x-referer-package": "com.360buy.jdmobile"
      },
      "sign": true,
      "jdje": true,
      "noReferer": true
    });
    return _0x3ad953 && _0x3ad953.code === "0" && _0x3ad953.isSuccess && (this.shopName = _0x3ad953.result.shopInfo.shopName, this.venderId = _0x3ad953.result.shopInfo.venderId, this.shopId = _0x3ad953.result.shopInfo.shopId, _0x3caf61.activity = Object.assign(_0x3caf61.activity, {
      "shopName": this.shopName,
      "shopId": this.shopId,
      "venderId": this.venderId
    })), _0x3ad953;
  }
  async ["follow"](_0x2af164 = this.shopId) {
    let _0x766134 = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "followShop",
      "body": {
        "member": "true",
        "follow": "true",
        "shopId": _0x2af164.toString(),
        "award": "false",
        "sourceRpc": "shop_app_home_follow"
      },
      "headers": {
        "User-Agent": this.ua.jd4,
        "jdgs": "-3107",
        "x-rp-client": "ios_4.0.0",
        "x-referer-package": "com.360buy.jdmobile"
      },
      "sign": true,
      "jdje": true,
      "noReferer": true
    });
    this.debug(_0x766134);
    if (_0x766134 && _0x766134.code === "0") return this.log(_0x766134.msg || "关注成功"), true;
    return this.log(_0x766134), false;
  }
  async ["unfollow"](_0x326635 = this.shopId || this.venderId) {
    let _0xab9987 = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "followShop",
      "body": {
        "follow": "false",
        "shopId": _0x326635.toString(),
        "award": "false",
        "sourceRpc": "shop_app_home_follow"
      },
      "headers": {
        "User-Agent": this.ua.jd4,
        "jdgs": "-3107",
        "x-rp-client": "ios_4.0.0",
        "x-referer-package": "com.360buy.jdmobile"
      },
      "sign": true,
      "jdje": true,
      "noReferer": true
    });
    if (_0xab9987 && _0xab9987.code === "0") return this.log(_0xab9987.msg || "取消关注成功"), true;
    return this.log(_0xab9987), false;
  }
  async ["wxApi"](_0x15dde8, _0x1f0502 = {}) {
    return await this.taskPost(_0x15dde8, {
      "activityId": this.activityId,
      ..._0x1f0502
    });
  }
  async ["getSimpleActInfoVo"](_0x5e6a66 = "customer/getSimpleActInfoVo") {
    if (_0x3caf61.activity.activityType) {
      this.type = _0x3caf61.activity.type;
      this.venderId = _0x3caf61.activity?.["venderId"];
      this.shopId = _0x3caf61.activity?.["shopId"];
      this.activityType = _0x3caf61.activity?.["activityType"];
      return;
    }
    let _0x3ba78f = await this.wxApi(_0x5e6a66);
    if (_0x3ba78f && _0x3ba78f?.["result"] && _0x3ba78f?.["data"]) {
      _0x3caf61.activity = Object.assign(_0x3caf61.activity, _0x3ba78f?.["data"]);
      this.venderId = _0x3ba78f?.["data"]?.["venderId"];
      this.shopId = _0x3ba78f?.["data"]?.["shopId"];
      this.activityType = _0x3ba78f?.["data"]?.["activityType"];
      const _0x486900 = {
        5: "wxCollectionActivity",
        6: "wxCollectionActivity",
        7: "wxGameActivity",
        11: "wxDrawActivity",
        12: "wxDrawActivity",
        13: "wxDrawActivity",
        15: "sign",
        16: "daily",
        17: "wxShopFollowActivity",
        18: "sevenDay",
        20: "wxKnowledgeActivity",
        24: "wxShopGift",
        25: "wxShareActivity",
        26: "wxPointDrawActivity",
        42: "wxCollectCard",
        46: "wxTeam",
        65: "wxBuildActivity",
        69: "wxFansInterActionActivity",
        70: "wxCartKoi/cartkoi",
        71: "wxSecond",
        73: "wxShopGift",
        100: "wxTeam",
        102: "wxTeam",
        103: "mc/wxMcLevelAndBirthGifts",
        104: "mc/wxMcLevelAndBirthGifts",
        119: "mc/wxMcLevelAndBirthGifts",
        124: "wxScratchActive",
        125: "wxPointBlindBox",
        128: "wxGashaponActive",
        129: "wxDollGrabbing",
        204: "wxPointShop",
        1001: "wxgame",
        1002: "wxgame",
        2001: "drawCenter",
        2002: "drawCenter",
        2003: "drawCenter",
        2004: "drawCenter",
        2006: "drawCenter"
      };
      if (_0x486900[this.activityType]) {
        this.type = _0x486900[this.activityType];
      } else this.type = "wxDrawActivity";
      _0x3caf61.activity.type = this.type;
    } else this.putMsg("手动确认,活动不存在或者已结束"), this.stop();
    return _0x3ba78f;
  }
  async ["activityContent"](_0x17a3b4 = {}, _0x262238 = "") {
    let _0x10e2bb = await this.wxApi(this.type + "/activityContent", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      ..._0x17a3b4
    });
    if (_0x10e2bb && _0x10e2bb?.["data"]) {
      let _0x5d7f5a = _0x262238 ? _0x10e2bb.data[_0x262238] : _0x10e2bb.data,
        _0x456da3 = _0x5d7f5a?.["startTime"],
        _0x4a64ea = _0x5d7f5a?.["endTime"];
      const _0x5f2515 = _0x5d7f5a?.["rule"] || _0x5d7f5a?.["actRule"] || "";
      try {
        if (!_0x456da3 || !_0x4a64ea) {
          const _0x473719 = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/g,
            _0x3e1185 = _0x5f2515.match(_0x473719);
          _0x3e1185 && (_0x456da3 = new Date(_0x3e1185[0]).getTime(), _0x4a64ea = new Date(_0x3e1185[1]).getTime());
        }
        this.rule = _0x5f2515;
        _0x3caf61.activity.timeStr = this.formatDate(_0x456da3, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(_0x4a64ea, "yyyy-MM-dd HH:mm:ss");
        _0x3caf61.activity.startTime = _0x456da3;
        _0x3caf61.activity.endTime = _0x4a64ea;
      } catch (_0x229ae6) {}
      _0x456da3 && _0x456da3 > Date.now() && (this.putMsg("活动未开始"), _0x3caf61.activity.noStart = true, this.stop());
      _0x4a64ea && _0x4a64ea < Date.now() && (this.putMsg("活动已结束"), this.stop());
    }
    return _0x10e2bb;
  }
  async ["getGiveContent"]() {
    let _0x450181 = await this.wxApi("wxDrawActivity/getGiveContent", {
      "pin": this.secretPin
    });
    if (_0x450181 && _0x450181?.["data"]) {}
    return _0x450181;
  }
  async ["initPinToken"](_0x5239fc = this.venderId, _0x578c76 = this.shopId) {
    let _0x370c4d = {
        "activityId": this.activityId,
        "jdToken": this.isvToken,
        "source": "01",
        "uuid": this.phoneInfo.uuid,
        "clientTime": Date.now()
      },
      _0x221e60 = "";
    this.mode === "100" ? (_0x370c4d = {
      ..._0x370c4d,
      "shareUserId": "",
      "shopId": _0x578c76,
      "status": 1
    }, _0x221e60 = "https://" + this.domain + this.prefix + "/api/user-info/initPinToken") : (_0x370c4d = {
      ..._0x370c4d,
      "venderId": _0x5239fc,
      "fromType": "APP",
      "riskType": 1,
      "client": "iOS",
      "clientVersion": this.phoneInfo.clientVersion,
      "osVersion": this.phoneInfo.iv,
      "model": "iPhone" + this.phoneInfo.tf,
      "userAgent": this.ua.app
    }, _0x221e60 = "https://" + this.domain + "/customer/initPinToken");
    let _0x1a3e86 = await this.taskGet(this.mode === "wx" ? "customer/initPinToken" : "api/user-info/initPinToken", _0x370c4d);
    if (this.mode === "wx" && _0x1a3e86 && _0x1a3e86.result) this.secretPin = encodeURIComponent(_0x1a3e86.data?.["secretPin"]), this.nickname = _0x1a3e86.data?.["nickname"];else {
      if (this.mode === "100" && _0x1a3e86 && _0x1a3e86.resp_code === 0) this.pinToken = JSON.parse(_0x1a3e86.data)?.["data"]?.["pinToken"];else {
        this.putMsg(_0x1a3e86?.["errorMessage"] || _0x1a3e86?.["data"] || _0x1a3e86?.["resp_msg"]);
        this.wxStop(_0x1a3e86?.["errorMessage"] || _0x1a3e86?.["data"] || _0x1a3e86?.["resp_msg"]);
        this.reseCookieStatus();
        this.exit();
      }
    }
    return _0x1a3e86;
  }
  async ["getMyPing"](_0x1bab9c = "customer/getMyPing", _0x3c5a5f = this.isvToken, _0x128cce = this.venderId) {
    let _0x4e81fa = await this.wxApi(_0x1bab9c, {
      "userId": _0x128cce,
      "token": _0x3c5a5f,
      "fromType": "APP"
    });
    if (_0x4e81fa && _0x4e81fa?.["result"]) this.secretPin = _0x4e81fa.data?.["secretPin"], this.nickname = _0x4e81fa.data?.["nickname"];else {
      let _0x3d456a = _0x4e81fa?.["errorMessage"] || "获取pin失败";
      this.putMsg(_0x3d456a);
      this.wxStop(_0x3d456a);
      _0x3d456a.includes("请联系商家") && this.stop();
      this.reseCookieStatus();
      this.exit();
    }
    return _0x4e81fa;
  }
  async ["accessLog"](_0x2175a8 = this.secretPin) {
    let _0x4bb39c = this.domain.includes("cjhy") ? "accessLog" : "accessLogWithAD";
    await this.wxApi("common/" + _0x4bb39c, {
      "venderId": this.venderId,
      "code": this.activityType,
      "pin": _0x2175a8,
      "activityId": this.activityId,
      "pageUrl": this.activityUrl,
      "subType": "app",
      "uuid": this.phoneInfo.uuid
    });
  }
  async ["saveAddress"](_0x4d91d8 = this.addressId, _0x3a02b2 = this.prizeName) {
    _0x3caf61.isSaveAddress = true;
    this.getAddress();
    if (!this.address) {
      this.putMsg("未配置地址或所有地址已达使用上限,退出填地址");
      return;
    }
    if (_0x412771.addressStopKeywords && _0x412771.addressStopKeywords.some(_0x28b3d1 => {
      return _0x3a02b2?.["includes"](_0x28b3d1);
    })) {
      this.putMsg("触发关键词不填地址");
      return;
    }
    if (_0x412771.addressStopKeywordsRule && _0x412771.addressStopKeywordsRule.some(_0x330d97 => {
      return this.rule?.["includes"](_0x330d97);
    })) {
      this.putMsg("触发规则不填地址");
      return;
    }
    this.log("使用地址", this.address);
    let _0x375d9e = false;
    if (this.mode == "wx") {
      this.address.generateId = _0x4d91d8;
      let _0x295d73 = await this.wxApi("wxAddress/save", {
        ...this.address,
        "venderId": this.venderId,
        "pin": this.secretPin,
        "activityId": this.activityId,
        "actType": this.activityType,
        "prizeName": _0x3a02b2,
        "personalEmail": ""
      });
      this.log(_0x295d73);
      _0x295d73 && _0x295d73.result ? (this.putMsg("已填地址"), _0x375d9e = true) : (this.putMsg("填地址失败"), this.putMsg(_0x295d73.errorMessage));
    } else {
      if (this.mode === "100") {
        const {
          phone: _0x676dc7,
          address: _0x152cac,
          receiver: _0x2f8998,
          city: _0x58d72d,
          county: _0x4c5373,
          province: _0x5baffe
        } = this.address;
        let _0x50ed32 = {
            "mobile": _0x676dc7,
            "address": _0x152cac,
            "realName": _0x2f8998,
            "city": _0x58d72d,
            "county": _0x4c5373,
            "orderCode": _0x4d91d8,
            "province": _0x5baffe
          },
          _0x141332 = await this.lzkjApi("api/my/prize/update", _0x50ed32);
        if (_0x141332.resp_code === 0) this.putMsg("已填地址"), _0x375d9e = true;else this.putMsg("填地址失败"), this.putMsg(_0x141332.resp_msg);
      } else {
        if (this.mode === "hdb") {
          const {
            phone: _0x3484f3,
            address: _0x531aa8,
            receiver: _0x5a8f3a,
            city: _0x584567,
            county: _0x1751c9,
            province: _0x863a0d
          } = this.address;
          let _0x530d41 = {
              "province": _0x863a0d,
              "city": _0x584567,
              "area": _0x1751c9,
              "detailAddress": _0x531aa8,
              "address": "" + _0x863a0d + _0x584567 + _0x1751c9 + _0x531aa8,
              "mobile": _0x3484f3,
              "receiveName": _0x5a8f3a,
              "activityLogId": _0x4d91d8
            },
            _0x2680d4 = await this.hdbApi("postDeliveryInfo", _0x530d41);
          this.log(_0x2680d4);
          _0x2680d4 && _0x2680d4.succ ? (this.putMsg("已填地址"), _0x375d9e = true) : (this.putMsg("填地址失败"), this.putMsg(_0x2680d4?.["message"]));
        } else {
          if (this.mode === "hzbz") {
            const {
              phone: _0x541aaa,
              address: _0x5e64b3,
              receiver: _0x31a905,
              city: _0x43aed6,
              county: _0x337782,
              province: _0x28e359
            } = this.address;
            let _0x365327 = {
                "addressRegion": _0x28e359 + "-" + _0x43aed6 + "-" + _0x337782,
                "address": _0x5e64b3,
                "mobile": _0x541aaa,
                "name": _0x31a905,
                "condtionId": ""
              },
              _0x4f6fcc = await this.hzbzApi("SaveUserInfo.json", _0x365327);
            this.log(_0x4f6fcc);
            _0x4f6fcc && _0x4f6fcc.code === 0 ? (this.putMsg("已填地址"), _0x375d9e = true) : (this.putMsg("填地址失败"), this.putMsg(_0x4f6fcc?.["txt"]));
          } else {
            if (this.mode === "jinggeng") {
              const {
                phone: _0x22a722,
                address: _0x3af9c5,
                receiver: _0x9833a1,
                city: _0x4cd04f,
                county: _0x5bd2e2,
                province: _0x2207b9
              } = this.address;
              let _0x2e7b57 = await this.jinggengApi("postBuyerInfo", {
                "receiverName": _0x9833a1,
                "mobile": _0x22a722,
                "address": _0x2207b9.replace("省", "").replace("市", "") + " " + _0x4cd04f.replace("市", "") + " " + _0x5bd2e2 + _0x3af9c5,
                "log_id": _0x4d91d8
              });
              this.log(_0x2e7b57);
              if (_0x2e7b57 && _0x2e7b57.succ) this.putMsg("已填地址"), _0x375d9e = true;else this.putMsg("填地址失败"), this.putMsg(_0x2e7b57?.["msg"]);
            } else {
              if (this.mode === "v2") {
                if (!this.activityPrizeId) return this.putMsg("activityPrizeId不存在,退出填地址");
                const {
                  phone: _0x23d556,
                  address: _0x4c0128,
                  receiver: _0x161e87,
                  city: _0x4515d6,
                  county: _0x56901f,
                  province: _0x1b492a
                } = this.address;
                let _0x5549f0 = await this.v2Api("api/" + this.activityType + "/userAddressInfo", {
                  "addressId": _0x4d91d8,
                  "address": _0x4c0128,
                  "county": _0x56901f,
                  "city": _0x4515d6,
                  "province": _0x1b492a,
                  "mobile": _0x23d556,
                  "realName": _0x161e87,
                  "activityPrizeId": this.activityPrizeId
                });
                this.log(_0x5549f0);
                _0x5549f0 && _0x5549f0.code === 200 ? (this.putMsg("已填地址"), _0x375d9e = true) : (this.putMsg("填地址失败"), this.putMsg(_0x5549f0?.["message"]));
              }
            }
          }
        }
      }
    }
    if (_0x375d9e) {
      let _0x4cd7de = this.formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss") + "," + _0x3a02b2 + "," + this.pin + "," + this.address?.["phone"] + "," + this.address?.["address"] + "," + _0x536960.envInfo.name + "," + (this.shopId ?? this.venderId) + "," + this.activityUrl + "\n";
      this.appendFileSync("", "gifts.csv", _0x4cd7de);
    }
    _0x3caf61.isSaveAddress = false;
  }
  async ["getPrize"]() {
    let _0x4979a6 = await this.wxApi(this.type + "/getPrize", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(_0x4979a6);
    if (_0x4979a6 && _0x4979a6.result && _0x4979a6.data?.["drawOk"]) {
      this.putMsg(_0x4979a6.data.name || "空气");
      return;
    }
    let _0x233ac1 = _0x4979a6?.["errorMessage"] || _0x4979a6?.["data"]?.["errorMessage"];
    if (!_0x233ac1) return;
    return this.putMsg(_0x233ac1), this.wxStop(_0x233ac1), _0x4979a6;
  }
  async ["login"](_0x5b57fa = true, _0x1fa1aa = this.isvToken) {
    if (this.mode === "100") {
      let _0x33ccff = {
        "activityId": this.activityId,
        "tokenPin": _0x1fa1aa,
        "status": 1,
        "source": "01",
        "shareUserId": "",
        "uuid": this.phoneInfo.uuid,
        "client": "iOS",
        "clientVersion": this.phoneInfo.clientVersion,
        "osVersion": this.phoneInfo.iv,
        "model": "iPhone" + this.phoneInfo.tf,
        "userAgent": this.ua.app
      };
      if (this.domain.includes("lzkj")) {}
      let _0x552fad = await this.taskPostByJson("api/user-info/login", _0x33ccff);
      if (_0x552fad && _0x552fad.resp_code === 0) {
        this.token = _0x552fad.data.token;
        this.headers.token = _0x552fad.data.token;
        let _0x1d0be4 = this.haskey(_0x552fad, "data.joinInfo.joinCodeInfo.joinCode");
        this.joinDes = _0x552fad.data.joinInfo.joinCodeInfo.joinDes;
        this.log("登录成功|" + _0x1d0be4 + "|" + this.joinDes);
        _0x3caf61.activity.shopId = _0x552fad.data.shopId;
        this.shopId = _0x552fad.data.shopId;
        this.joinCode = _0x1d0be4;
        const _0x5971c0 = /venderId=(\d+)/,
          _0x2fe016 = _0x552fad.data.joinInfo?.["openCardUrl"];
        this.venderId = _0x2fe016 ? _0x2fe016.match(_0x5971c0)[1] : this.shopId;
        _0x3caf61.activity = {
          ..._0x3caf61.activity,
          "shopId": this.shopId,
          "venderId": this.venderId
        };
        if (_0x1d0be4 === "1003" || this.lzkjOpenCard && ["1005", "1002", "1006"].includes(_0x1d0be4) && !this.openCardTypes.includes(this.activityType)) return this.putMsg(this.joinDes), this.exit();
        await this.lzkjApi("api/task/followShop/follow");
        _0x5b57fa && (await this.lzkjBaseInfo());
      } else this.putMsg(_0x552fad?.["resp_msg"] || "登录失败"), this.wxStop(_0x552fad?.["resp_msg"]), this.exit();
      return _0x552fad;
    } else {
      if (["hdb"].includes(this.mode)) {
        let _0xae83a3 = await this.taskPostByJson("front/fans/login", {
          "appJsonParams": {
            "id": this.activityId,
            "source": "01",
            "userId": this.userId,
            "token": _0x1fa1aa,
            "method": "/front/fans/login"
          },
          "sysParams": {
            "sign": "111111",
            "timestamp": 123456,
            "sysmethod": "/front/fans/login"
          }
        });
        if (_0xae83a3 && _0xae83a3?.["code"] == 200) {
          this.buyerNick = _0xae83a3?.["result"]?.["buyerNick"];
          this.aesBuyerNick = _0xae83a3?.["result"]?.["aesBuyerNick"];
          this.userId = _0xae83a3?.["result"]?.["userId"];
          this.openCard = _0xae83a3?.["result"]?.["openCard"];
          _0x3caf61.activity.shopId = this.userId;
          _0x3caf61.activity.venderId = this.userId;
        } else _0xae83a3?.["message"]?.["includes"]("商家订购过期") ? (this.putMsg("商家订购过期"), this.stop()) : (this.putMsg(_0xae83a3?.["message"] || "登录失败"), this.exit());
        return _0xae83a3;
      } else {
        if (this.mode === "v2") {
          let _0x4bf508 = await this.v2Api("api/user/login", {
            "token": _0x1fa1aa,
            "source": "01",
            "activityType": this.activityType,
            "templateCode": this.templateCode,
            "activityId": this.activityId,
            "shopId": this.shopId,
            "uuid": this.phoneInfo.uuid,
            "timestamp": this.timestamp()
          });
          if (_0x4bf508 && _0x4bf508?.["code"] === 200) {
            this.headers["Pin-Token"] = _0x4bf508?.["data"]?.["pinToken"];
            this.headers["Activity-Id"] = this.activityId;
            this.headers["Shop-Id"] = this.shopId;
            this.headers["Activity-Type"] = this.activityType;
            this.headers["Template-Code"] = this.templateCode;
            this.secretPin = _0x4bf508?.["data"]?.["encryptPin"];
            await this.getActivityBase();
          } else this.putMsg(_0x4bf508?.["message"] || "登录失败"), this.exit();
          return _0x4bf508;
        }
      }
    }
  }
  async ["lzkjBaseInfo"]() {
    this.needPinToken && (await this.initPinToken());
    await this.basicInfo();
    await this.getPrizeList();
    this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(_0x41013 => ![2].includes(_0x41013.prizeType) && _0x41013.leftNum !== 0).length === 0 && (this.putMsg("垃圾活动"), this.stop());
    if (!["1001", "1004"].includes(this.joinCode) && this.openCardTypes.includes(this.activityType)) return await this.bindWithVender(), await this.login(false);
    if (this.joinCode === "1004") await this.login(false);
  }
  async ["basicInfo"]() {
    let _0x4dfc11 = await this.taskPostByJson("api/active/basicInfo", {
      "activityId": this.activityId
    });
    if (_0x4dfc11 && _0x4dfc11.resp_code === 0) {
      const _0x1a9883 = {
          10001: {
            "name": "签到抽奖",
            "api": "sign"
          },
          10002: {
            "name": "签到抽奖",
            "api": "sign"
          },
          10003: {
            "name": "签到抽奖",
            "api": "sign"
          },
          10004: {
            "name": "签到抽奖",
            "api": "sign"
          },
          10006: {
            "name": "邀好友",
            "api": "member"
          },
          10011: {
            "name": "答题有礼",
            "api": "knowledge"
          },
          10020: {
            "name": "幸运抽奖",
            "api": "jiugongge"
          },
          10021: {
            "name": "幸运抽奖",
            "api": "jiugongge"
          },
          10022: {
            "name": "每日抢好礼",
            "api": "dailyGrabs"
          },
          10023: {
            "name": "签到有礼",
            "api": "daySign"
          },
          10024: {
            "name": "加购有礼",
            "api": "addSku"
          },
          10025: {
            "name": "关注店铺",
            "api": "followShop"
          },
          10026: {
            "name": "积分抽奖",
            "api": "points"
          },
          10027: {
            "name": "积分PK",
            "api": "integralPk"
          },
          10030: {
            "name": "下单有礼",
            "api": "orderGift"
          },
          10031: {
            "name": "幸运抽奖",
            "api": "niudanji"
          },
          10032: {
            "name": "集卡有礼",
            "api": "collectCard"
          },
          10033: {
            "name": "组队瓜分",
            "api": "organizeTeam"
          },
          10034: {
            "name": "神券裂变",
            "api": "fissionCoupon"
          },
          10035: {
            "name": "秒读手速",
            "api": "dmpss"
          },
          10036: {
            "name": "购物车锦鲤",
            "api": "addSkuPrice"
          },
          10040: {
            "name": "签到有礼",
            "api": "daySign"
          },
          10041: {
            "name": "幸运抽奖",
            "api": "lotteryCenter"
          },
          10042: {
            "name": "幸运抽奖",
            "api": "lotteryCenter"
          },
          10043: {
            "name": "分享有礼",
            "api": "sharePolitely"
          },
          10044: {
            "name": "投票抽奖",
            "api": "votePolitely"
          },
          10045: {
            "name": "买家秀",
            "api": "buyersShow"
          },
          10046: {
            "name": "幸运抽奖",
            "api": "lotteryCenter"
          },
          10047: {
            "name": "盖楼有礼",
            "api": "building"
          },
          10048: {
            "name": "限时抢券",
            "api": "robCoupon"
          },
          10049: {
            "name": "完善信息",
            "api": "perfectInfo"
          },
          10053: {
            "name": "关注商品",
            "api": "followGoods"
          },
          10054: {
            "name": "上上签抽奖",
            "api": "upperSign"
          },
          10058: {
            "name": "店铺礼包",
            "api": "shopGift"
          },
          10059: {
            "name": "合成大赢家",
            "api": "bigwinner"
          },
          10060: {
            "name": "新人优惠券",
            "api": "couponMarketing"
          },
          10063: {
            "name": "翻牌抽奖",
            "api": "lotteryCenter"
          },
          10062: {
            "name": "翻牌抽奖",
            "api": "lotteryCenter"
          },
          10068: {
            "name": "邀请关注",
            "api": "inviteFollowShop"
          },
          10069: {
            "name": "关注有礼",
            "api": "lkFollowShop"
          },
          10070: {
            "name": "邀请入会",
            "api": "member"
          },
          10073: {
            "name": "幸运抽奖",
            "api": "lotteryCenter"
          },
          10077: {
            "name": "首购有礼",
            "api": "first/buy"
          },
          10078: {
            "name": "满额有礼",
            "api": "consumptionGift"
          },
          10079: {
            "name": "积分兑换",
            "api": "pointsExchange"
          },
          10080: {
            "name": "积分刮刮乐",
            "api": "points"
          },
          10081: {
            "name": "答题有礼",
            "api": "questionnaire"
          },
          10082: {
            "name": "互动游戏",
            "api": "game"
          },
          10084: {
            "name": "互动游戏",
            "api": "game"
          },
          10086: {
            "name": "互动游戏",
            "api": "game"
          },
          10089: {
            "name": "互动游戏",
            "api": "game"
          },
          10091: {
            "name": "互动游戏",
            "api": "game"
          },
          10092: {
            "name": "互动游戏",
            "api": "game"
          },
          10093: {
            "name": "互动游戏",
            "api": "game"
          },
          10094: {
            "name": "互动游戏",
            "api": "game"
          },
          10095: {
            "name": "互动游戏",
            "api": "game"
          },
          335: {
            "name": "入会有礼",
            "api": "rights"
          }
        },
        {
          shopName: _0x187cb4,
          startTime: _0x8d0605,
          endTime: _0x318c67,
          actType: _0x1139b0
        } = _0x4dfc11.data;
      this.actType = _0x1139b0;
      this.type = _0x1a9883[_0x1139b0]?.["api"];
      this.shopName = _0x187cb4;
      const _0xc8067c = this.formatDate(_0x8d0605, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(_0x318c67, "yyyy-MM-dd HH:mm:ss");
      _0x3caf61.activity = {
        ..._0x3caf61.activity,
        "shopName": _0x187cb4,
        "actType": _0x1139b0,
        "startTime": _0x8d0605,
        "endTime": _0x318c67,
        "timeStr": _0xc8067c
      };
      _0x8d0605 && _0x8d0605 > Date.now() && (this.putMsg("活动未开始"), _0x3caf61.activity.noStart = true, this.stop());
      _0x318c67 && _0x318c67 < Date.now() && (this.putMsg("活动已结束"), this.stop());
      if (!this.type) {
        this.putMsg("未知类型");
        this.exit();
        return;
      }
    }
    return _0x4dfc11;
  }
  async ["getDefenseUrls"]() {
    if (_0x3caf61.activity.defenseUrls) return this.defenseUrls = _0x3caf61.activity.defenseUrls;
    const {
      domain: _0x2416f0,
      mode: _0x3c0689
    } = this;
    let _0x5679e2;
    if (_0x3c0689 === "wx") _0x5679e2 = "https://" + _0x2416f0 + "/customer/getDefenseUrls";else {
      if (_0x3c0689 === "100") _0x5679e2 = "https://" + this.domain + this.prefix + "/api/user-info/getDefenseUrls";else {
        this.defenseUrls = [];
        return;
      }
    }
    let _0x5d5a2f = await this.jd_api({
      "url": _0x5679e2,
      "maxRedirects": 0
    }, false);
    if (this.haskey(_0x5d5a2f, "data")) {
      this.defenseUrls = _0x3c0689 === "wx" ? _0x5d5a2f.data : _0x5d5a2f.data.map(_0xddc83f => _0xddc83f.interfaceName);
    } else this.defenseUrls = [];
    _0x3caf61.activity.defenseUrls = this.defenseUrls;
  }
  async ["getPrizeList"]() {
    if (_0x3caf61.activity.prizeList) {
      this.prizeList = _0x3caf61.activity.prizeList;
      return;
    }
    let _0x2bdd41 = await this.lzkjApi("api/prize/drawPrize");
    _0x2bdd41 && _0x2bdd41.resp_code === 0 && (this.prizeList = _0x2bdd41.data?.["prizeInfo"] ?? [], _0x3caf61.activity.prizeList = this.prizeList);
  }
  async ["getUserId"]() {
    let _0x3ea1f1 = await this.lzkjApi("api/task/share/getUserId");
    return _0x3ea1f1 && _0x3ea1f1.resp_code === 0 && (this.shareUserId = _0x3ea1f1.data?.["shareUserId"]), _0x3ea1f1;
  }
  async ["lzkjToDo"](_0x3e4e21, _0x13ce42 = "", _0x48f439 = 0) {
    let _0x252a95 = {
        1: "关注店铺",
        2: "浏览店铺",
        3: "浏览商品",
        4: "浏览会场/直播",
        5: "关注商品",
        6: "预约商品",
        7: "加购商品",
        8: "购买商品",
        9: "分享商品",
        10: "分享店铺",
        11: "分享会场",
        12: "分享活动",
        13: "会员开卡",
        14: "每日签到",
        15: "邀请助力",
        22: "购买商品"
      },
      _0x263fc9 = await this.lzkjApi("api/basic/task/toDo", {
        "taskId": _0x3e4e21,
        "skuId": _0x13ce42
      });
    if (_0x263fc9 && _0x263fc9.resp_code === 0) return this.log("任务[" + (_0x252a95[_0x48f439] || _0x3e4e21 || _0x48f439) + "]完成"), true;
    return false;
  }
  async ["lzkjTask"](_0x515a81 = []) {
    try {
      if (_0x515a81.length > 0) for (let _0x378117 of _0x515a81) {
        if (_0x378117.status === 1) continue;
        const {
          taskType: _0xf85668,
          taskId: _0xe63c39,
          completeCount: _0xa2fd3e,
          oneClickPurchase: _0x2e7f90,
          finishNum: _0x435e5b,
          maxNum: _0x28e856,
          oneClickFollowPurchase: _0xaab210,
          activeLimit = {}
        } = _0x378117;
        if ([8, 13, 15, 22].includes(_0xf85668)) continue;
        if ([1, 14].includes(_0xf85668)) {
          await this.lzkjToDo(_0xe63c39, "", _0xf85668);
          continue;
        }
        if (_0x2e7f90 === 0 || _0xaab210 === 0) {
          await this.lzkjToDo(_0xe63c39, "", _0xf85668);
          continue;
        }
        let _0x1c3ea1 = _0x378117.shareCount || _0x378117.completeCount || 0,
          _0x1de95a = (_0x28e856 ?? activeLimit?.["limitNum"] ?? 1) * _0x435e5b;
        if (_0x1c3ea1 < _0x1de95a) {
          let _0x568afc = _0x378117?.["skuInfoVO"]?.["filter"](_0x11fc02 => _0x11fc02?.["status"] === 0);
          for (let _0x2411dc = 0; _0x2411dc < _0x1de95a; _0x2411dc++) {
            await this.lzkjToDo(_0xe63c39, _0x568afc?.[_0x2411dc]?.["skuId"] || "", _0xf85668);
            _0x1c3ea1++;
            if (_0x1c3ea1 >= _0x1de95a) break;
          }
        }
      }
    } catch (_0x4286b3) {
      this.log(_0x4286b3.message);
    }
  }
  async ["acquire"](_0x5a8e32) {
    let _0x21546e = await this.lzkjApi("api/prize/receive/acquire", {
      "prizeInfoId": _0x5a8e32,
      "status": 1
    });
    if (_0x21546e && _0x21546e.resp_code === 0) {
      this.putMsg(_0x21546e.data?.["prizeName"]);
      _0x21546e.data.prizeType === 3 && (this.addressId = _0x21546e.data?.["addressId"], this.prizeName = _0x21546e.data?.["prizeName"], await this.saveAddress());
      return;
    }
    this.putMsg(_0x21546e?.["resp_msg"]);
    this.wxStop(_0x21546e?.["resp_msg"]);
  }
  async ["lzkjApi"](_0x5cc205, _0x2da11b = {}) {
    return await this.taskPostByJson(_0x5cc205, _0x2da11b, {
      "token": this.token
    });
  }
  ["getHmacSha256Sign"](_0x445957, _0x2df956) {
    const _0x41120d = "actid" + this.activityId + "buyernick" + this.aesBuyerNick + "sysmethod" + _0x445957 + "timestamp" + _0x2df956;
    return this.hmacSHA256(this.getCookieByName("_sk") || "1111", _0x41120d);
  }
  async ["hdbApi"](_0x145d5f, _0x4437b2 = {}, _0x2dba74 = false, _0x19c8dd = true) {
    let _0x16dc13 = _0x2dba74 ? "/front/task/" + _0x145d5f : "/front/activity/" + _0x145d5f,
      _0x36d998 = await this.taskPostByJson(_0x16dc13, {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.userId,
          "method": _0x16dc13,
          "buyerNick": this.aesBuyerNick,
          ..._0x4437b2
        }
      });
    if (_0x36d998 && /数字签名不匹配|数字签名已失效|用户未登录/.exec(_0x36d998?.["message"]) && _0x19c8dd) return await this.login(), await this.hdbApi(_0x145d5f, _0x4437b2, _0x2dba74, false);
    return _0x36d998;
  }
  async ["loadFrontAct"]() {
    let _0x2d8c00 = await this.hdbApi("loadFrontAct");
    if (_0x2d8c00 && _0x2d8c00?.["succ"]) {
      _0x3caf61.activity.shopName = _0x2d8c00?.["result"]?.["activity"]?.["shopTitle"];
      let _0x50924a = _0x2d8c00.result?.["activity"]?.["startTime"],
        _0x460f13 = _0x2d8c00.result?.["activity"]?.["endTime"],
        _0x24aaa6 = _0x2d8c00.result?.["user"]?.["shopId"],
        _0x2a2a28 = _0x2d8c00.result?.["user"]?.["venderId"];
      this.shopId = _0x24aaa6;
      this.venderId = _0x2a2a28;
      this.actType = _0x2d8c00.result?.["activity"]?.["actType"];
      _0x3caf61.activity = {
        ..._0x3caf61.activity,
        "shopId": _0x24aaa6,
        "venderId": _0x2a2a28,
        "startTime": _0x50924a,
        "endTime": _0x460f13
      };
      _0x50924a && _0x50924a > Date.now() && (this.putMsg("活动未开始"), _0x3caf61.activity.noStart = true, this.stop());
      _0x460f13 && _0x460f13 < Date.now() && (this.putMsg("活动已结束"), this.stop());
    }
  }
  async ["reportPVUV"]() {
    await this.hdbApi("reportPVUV");
  }
  async ["loadFrontAward"]() {
    let _0x2591f4 = await this.hdbApi("loadFrontAward");
    return _0x2591f4 && _0x2591f4.succ && (this.prizeList = _0x2591f4.result ?? [], this.prizeList.length > 0 && this.prizeList.filter(_0x3c4862 => !["JD_D_COUPON"].includes(_0x3c4862.awardType)).length === 0 && (this.putMsg("垃圾活动"), this.stop())), _0x2591f4;
  }
  ["formatDateString"](_0x30310e) {
    if (_0x30310e?.["match"](/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) return _0x30310e.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    return _0x30310e;
  }
  ["getRuleSETime"](_0x166f26 = this.rule) {
    const _0x3fd293 = /(\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}|\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}|\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2})/g,
      _0x800507 = _0x166f26.match(_0x3fd293);
    if (_0x800507) {
      const _0x561d3f = this.formatDateString(_0x800507[0]),
        _0x5b8ac5 = this.formatDateString(_0x800507[1]);
      this.startTime = new Date(_0x561d3f).getTime();
      this.endTime = new Date(_0x5b8ac5).getTime();
      _0x3caf61.activity.startTime = this.startTime;
      _0x3caf61.activity.endTime = this.endTime;
      this.startTime && this.startTime > Date.now() && (this.putMsg("活动未开始"), _0x3caf61.activity.noStart = true, this.stop());
      this.endTime && this.endTime < Date.now() && (this.putMsg("活动已结束"), this.stop());
    }
  }
  async ["jinggengShopInfo"]() {
    let _0x3f3e7d = await this.taskGet(this.activityUrl);
    if (_0x3f3e7d) {
      let _0x2da70f = _0x105fa7.load(_0x3f3e7d);
      const _0x3a007d = _0x2da70f("#shop_sid").attr("value"),
        _0x4338e8 = _0x2da70f("#shop_title").attr("value"),
        _0x4a61e9 = _0x2da70f("#description").text();
      this.debug("shop_sid", _0x3a007d);
      this.shopId = _0x3a007d;
      this.venderId = this.userId;
      this.shopName = _0x4338e8;
      this.rule = _0x4a61e9;
      const _0x1f5344 = _0x2da70f("title").text();
      return _0x3caf61.activity.shopName = this.shopName, _0x3caf61.activity.shopId = this.shopId, _0x3caf61.activity.venderId = this.venderId, this.getRuleSETime(_0x4a61e9), _0x1f5344?.["includes"]("已结束") && (this.putMsg("活动已结束"), this.stop()), _0x2da70f;
    }
    return undefined;
  }
  async ["setMixNick"](_0x2cccbd = this.isvToken) {
    let _0x1d84e1 = await this.taskPost("front/setMixNick", {
      "strTMMixNick": _0x2cccbd,
      "userId": this.userId,
      "source": "01"
    });
    return this.debug(_0x1d84e1), _0x1d84e1 && _0x1d84e1.succ && (this.mixNick = _0x1d84e1?.["msg"]), _0x1d84e1 && _0x1d84e1?.["msg"]?.["includes"]("商家token过期") && (this.putMsg("商家token过期"), this.stop()), !this.mixNick && (this.putMsg("获取mixNick失败"), this.exit()), _0x1d84e1;
  }
  async ["jinggengApi"](_0x2f4c74, _0xfcb9d = {}) {
    let _0x1afe86 = await this.taskPost("ql/front/" + _0x2f4c74, {
      "act_id": this.activityId,
      "user_id": this.userId,
      ..._0xfcb9d
    });
    return _0x1afe86;
  }
  async ["gzslApi"](_0x5334b5, _0x496b4c = {}, _0xc54a95 = false) {
    let _0x299c0c = {
      "token": this.isvToken,
      "source": "01",
      "activityId": this.activityId,
      ..._0x496b4c
    };
    _0xc54a95 && (_0x299c0c.wxToken = this.isvToken);
    let _0xd86360 = await this.taskPostByJson("wuxian/user/" + _0x5334b5 + "/" + this.activityId + (_0xc54a95 ? "?wxToken=" + encodeURIComponent(this.isvToken) : ""), _0x299c0c);
    return _0xd86360;
  }
  async ["hzbzInfo"]() {
    let _0x40351c = await this.taskGet(this.activityUrl);
    if (!_0x40351c) return;
    let _0x163d91 = this.textToHtml(_0x40351c),
      _0x3bab26 = _0x163d91("#draw_info").text();
    _0x3bab26 = this.parseJSON(_0x3bab26);
    let _0x442544 = _0x3bab26?.["stime"] || 0,
      _0x224950 = _0x3bab26?.["etime"] || 0;
    this.shopName = _0x3bab26?.["shopName"];
    this.shopId = _0x3bab26?.["shopId"];
    this.rule = _0x3bab26?.["drawRule"];
    _0x3caf61.activity.shopId = this.shopId;
    _0x3caf61.activity.venderId = this.shopId;
    _0x3caf61.activity.shopName = this.shopName;
    _0x3caf61.activity.startTime = _0x442544;
    _0x3caf61.activity.endTime = _0x224950;
    if (_0x442544 && _0x442544 > this.timestamp()) {
      this.putMsg("活动未开始");
      this.stop();
      return;
    }
    if (_0x224950 && _0x224950 < this.timestamp()) {
      this.putMsg("活动已结束");
      this.stop();
      return;
    }
    return _0x163d91;
  }
  async ["hzbzApi"](_0x145b81, _0x19923a = {}) {
    let _0x46cd4 = await this.taskPost("bigdraw/" + _0x145b81, _0x19923a);
    return _0x46cd4;
  }
  async ["v2Api"](_0x28da20, _0x18f1f3 = undefined) {
    let _0x4ee57d = await this.taskPostByJson(_0x28da20, this.encryptCrypto("AES", "CBC", "Pkcs7", "2JjUvJEAsA2Yog==", JSON.stringify(_0x18f1f3, null, 2), "Hd5W5ONsYKmGm9QA"));
    return _0x4ee57d && _0x4ee57d.data && (_0x4ee57d.data = _0x4ee57d?.["data"] ? this.str2Json(this.decryptCrypto("AES", "CBC", "Pkcs7", "2JjUvJEAsA2Yog==", _0x4ee57d.data, "Hd5W5ONsYKmGm9QA")) : _0x4ee57d.data), _0x4ee57d;
  }
  async ["getActivityBase"]() {
    let _0x88d88e = await this.v2Api("api/common/getActivityBase");
    this.debug(_0x88d88e);
    if (_0x88d88e && _0x88d88e.code === 200) {
      this.shopName = _0x88d88e.data.shopName;
      let _0x2e83a4 = _0x88d88e.data.startTime,
        _0x24978c = _0x88d88e.data.endTime,
        _0x314e40 = _0x88d88e.data.openCardLink ?? "";
      this.venderId = this.getQueryString(_0x314e40, "venderId") ?? this.shopId;
      _0x2e83a4 && _0x2e83a4 > this.timestamp() && (this.putMsg("活动未开始"), _0x3caf61.activity.noStart = true, this.stop());
      _0x24978c && _0x24978c < this.timestamp() && (this.putMsg("活动已结束"), this.stop());
      let _0x21b7ec = _0x88d88e.data.thresholdResponseList ?? [];
      for (let _0x3dff2d of _0x21b7ec) {
        if (_0x3dff2d?.["type"] === 2 || _0x3dff2d?.["type"] === 1) {
          await this.v2Api("api/common/followShop");
          if (_0x3dff2d?.["type"] === 1) this.openCard = false;
          continue;
        }
      }
      _0x3caf61.activity.shopName = this.shopName;
      _0x3caf61.activity.startTime = _0x2e83a4;
      _0x3caf61.activity.endTime = _0x24978c;
      _0x3caf61.activity.shopId = this.shopId;
      _0x3caf61.activity.venderId = this.venderId;
      return;
    }
    this.putMsg(_0x88d88e?.["message"] || "获取活动信息失败");
    this.wxStop(_0x88d88e?.["message"]);
    this.exit();
  }
}
class _0x6ab66e {
  constructor(_0x34a3a2) {
    this.activityUrl = _0x34a3a2;
    this.switchInterval = _0x412771.wxProxyInterval;
    this.proxyEnable = false;
    this.proxyState = true;
    this.wxProxyMode = _0x412771.wxProxyMode;
    this.subscriptionUrls = _0x412771.wxProxyUrl.split("@@");
    this.proxie = null;
    this.currentIndex = 0;
    this.isLocked = false;
    this.wxProxyCheck = _0x412771.wxProxyCheck;
  }
  ["log"](..._0x574ed) {
    _0x2bb6ed("proxy".padEnd(_0x536960.paddedStringEndCount, " "), ..._0x574ed);
  }
  ["updateProxyEnable"](_0x2a806b) {
    !this.proxyEnable && _0x2a806b && this.startSwitching();
    !_0x2a806b && (this.stopSwitching(), this.proxie = null, this.proxyState = false);
    this.proxyEnable = _0x2a806b;
  }
  ["acquireLock"]() {
    return !this.isLocked ? (this.isLocked = true, Promise.resolve()) : new Promise(_0x427937 => {
      const _0x4f712 = () => {
          !this.isLocked && (clearInterval(_0x47f752), _0x427937());
        },
        _0x47f752 = setInterval(_0x4f712, 50);
    });
  }
  ["releaseLock"]() {
    this.isLocked = false;
  }
  async ["fetchProxies"](_0x1199bf = 10) {
    try {
      this.currentIndex = Math.floor(Math.random() * this.subscriptionUrls.length);
      const _0x49d0fa = this.subscriptionUrls[this.currentIndex],
        _0x3188c1 = await _0x396354.get(_0x49d0fa),
        _0x48808b = typeof _0x3188c1.data === "object" && _0x3188c1.data !== null ? JSON.stringify(_0x3188c1.data) : _0x3188c1.data,
        _0x42da7d = /((\w+:\w+@\w+\.\w+:\d+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+))/g,
        _0x197842 = _0x48808b.match(_0x42da7d);
      if (_0x197842) {
        this.log("已成功提取[" + _0x197842.length + "]ip");
        if (this.wxProxyMode === 2) this.proxie = _0x197842;else {
          this.proxie = [_0x197842[0]];
          this.log("获取到的ip:" + this.proxie[0]);
          if (this.wxProxyCheck === 1 && !(await this.checkPing(this.proxie[0]))) {
            if (_0x1199bf > 0) return this.log(this.proxie[0] + "不通,正在重新获取..."), await new Promise(_0x5f704a => setTimeout(_0x5f704a, 2000)), await this.fetchProxies(_0x1199bf - 1);else return false;
          }
        }
        return true;
      } else {
        this.log(_0x48808b);
        this.subscriptionUrls.splice(this.currentIndex, 1);
        if (this.subscriptionUrls.length === 0) return false;
        return await this.fetchProxies(_0x1199bf - 1);
      }
    } catch (_0x4bcbf8) {
      this.log("Failed to fetch proxies:", _0x4bcbf8.message);
      if (_0x1199bf > 0) return await this.fetchProxies(_0x1199bf - 1);
    }
  }
  async ["setCurrentProxy"](_0x2c9ea3 = false) {
    if (!this.proxyState) return false;
    if (!_0x2c9ea3 && this.wxProxyMode === 2 && this.proxie?.["length"] > 0) return true;
    if (!this.isLocked) {
      this.lock = await this.acquireLock();
      try {
        if (this.subscriptionUrls.length === 0) return false;
        if (!(await this.fetchProxies())) return this.log("获取代理ip失败,退出代理"), this.updateProxyEnable(false), false;
        return this.manualSwitch(), true;
      } finally {
        this.releaseLock();
      }
    } else return await this.acquireLock(), true;
  }
  async ["getProxy"](_0xe835c1 = 10) {
    let _0x298e57 = this.proxie.shift();
    if (!_0x298e57 && _0xe835c1 <= 0) return null;
    if (!_0x298e57) return await this.setCurrentProxy(), await this.getProxy(_0xe835c1 - 1);
    if (this.wxProxyCheck === 1 && !(await this.checkPing(_0x298e57))) {
      return _0xe835c1 > 0 ? (this.log(_0x298e57 + "不通,正在重新获取..."), await this.getProxy(_0xe835c1 - 1)) : null;
    }
    return _0x298e57;
  }
  async ["getCurrentProxy"]() {
    if (!this.proxyEnable) return null;
    return (!this.proxie || this.proxie?.["length"] === 0) && (await this.setCurrentProxy()), this.proxie ? this.proxie.length === 1 && this.wxProxyMode === 1 ? this.proxie[0] : await this.getProxy() : null;
  }
  async ["startSwitching"]() {
    if (this.timer) {
      this.log("已经启动定时切换。");
      return;
    }
    this.timer = setInterval(async () => {
      await this.setCurrentProxy(true);
    }, this.switchInterval * 1000);
  }
  ["stopSwitching"]() {
    this.timer && (clearInterval(this.timer), this.timer = null);
  }
  ["manualSwitch"]() {
    this.stopSwitching();
    this.startSwitching();
  }
  async ["checkPing"](_0x242ef6) {
    try {
      const _0x1fa749 = _0x242ef6.split(":");
      if (_0x1fa749.length !== 2) return false;
      return await _0x5df805({
        "url": this.activityUrl || "https://www.jd.com",
        "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
        },
        "httpsAgent": new _0x4b421e("http://" + _0x242ef6),
        "timeout": 4000
      }), true;
    } catch (_0x27873a) {
      return false;
    }
  }
}
class _0x4040b3 {
  constructor(_0x96cf03, _0x574ccc) {
    this.cookies = _0x96cf03;
    this.TaskClass = _0x574ccc;
    this._tasks = {};
  }
  *["taskGenerator"]() {
    for (let _0x3c9850 = 0; _0x3c9850 < this.cookies.length; _0x3c9850++) {
      if (!(_0x3c9850 in this._tasks)) {
        this._tasks[_0x3c9850] = new this.TaskClass(_0x3c9850, this.cookies[_0x3c9850]);
      }
      yield this._tasks[_0x3c9850];
    }
  }
  ["getTask"](_0x62fcac) {
    return !(_0x62fcac in this._tasks) && _0x62fcac < this.cookies.length && (this._tasks[_0x62fcac] = new this.TaskClass(_0x62fcac, this.cookies[_0x62fcac])), this._tasks[_0x62fcac];
  }
  get ["cookie_all_obj"]() {
    const _0x3d39b4 = this;
    return new Proxy([], {
      "get"(_0x22a509, _0x18f3c5) {
        if (_0x18f3c5 === "length") return _0x3d39b4.cookies.length;
        if (typeof _0x18f3c5 === "string" && !isNaN(_0x18f3c5)) {
          const _0x1bc5dd = Number(_0x18f3c5);
          if (_0x1bc5dd < _0x3d39b4.cookies.length) return _0x3d39b4.getTask(_0x1bc5dd);
        }
        return _0x22a509[_0x18f3c5];
      },
      "ownKeys"() {
        return Array.from({
          "length": _0x3d39b4.cookies.length
        }, (_0x5b0d7e, _0x16dce6) => String(_0x16dce6));
      },
      "getOwnPropertyDescriptor"(_0xc2e531, _0x7dee9) {
        if (typeof _0x7dee9 === "string" && !isNaN(_0x7dee9)) {
          const _0x2d7605 = Number(_0x7dee9);
          if (_0x2d7605 < _0x3d39b4.cookies.length) return {
            "configurable": true,
            "enumerable": true,
            "get": () => _0x3d39b4.cookie_all_obj[_0x2d7605],
            "set": _0x439697 => {
              _0x3d39b4.cookie_all_obj[_0x2d7605] = _0x439697;
            }
          };
        }
        return undefined;
      }
    });
  }
  ["filter"](_0x261639) {
    const _0xea5859 = [];
    for (let _0x2fcca1 = 0; _0x2fcca1 < this.cookies.length; _0x2fcca1++) {
      const _0x330555 = this.getTask(_0x2fcca1);
      _0x261639(_0x330555) && _0xea5859.push(_0x330555);
    }
    return _0xea5859;
  }
  ["map"](_0x1515a1) {
    const _0x396370 = [];
    for (let _0x26c4a7 = 0; _0x26c4a7 < this.cookies.length; _0x26c4a7++) {
      const _0x574459 = this.getTask(_0x26c4a7);
      _0x396370.push(_0x1515a1(_0x574459));
    }
    return _0x396370;
  }
  ["forEach"](_0x4e2aa3) {
    for (let _0x1a1828 = 0; _0x1a1828 < this.cookies.length; _0x1a1828++) {
      const _0x1938e5 = this.getTask(_0x1a1828);
      _0x4e2aa3(_0x1938e5);
    }
  }
  ["find"](_0xcd6a5d) {
    for (let _0x22c569 = 0; _0x22c569 < this.cookies.length; _0x22c569++) {
      const _0x127c5e = this.getTask(_0x22c569);
      if (_0xcd6a5d(_0x127c5e)) return _0x127c5e;
    }
    return undefined;
  }
}
class _0x536960 {
  static ["activity"] = {};
  static ["msg"] = [];
  static ["proxy"];
  static ["running"] = true;
  static ["cookies"] = [];
  static ["paddedStringEndCount"] = 0;
  static ["concurrencyLimit"] = 0;
  static ["version"] = "3.0.2";
  static ["envInfo"] = {};
  static ["cookieInit"]() {
    let _0x3bfb06 = [],
      _0xde6633 = [];
    Object.keys(_0x5b1859).forEach(_0x4d5d2e => {
      _0x3bfb06.push(_0x5b1859[_0x4d5d2e]);
    });
    if (_0x412771.wxEnableOtherEnv === 2) {
      let _0x52c28f = this.readFileSync("./env/ck.txt");
      _0xde6633 = _0x52c28f.split("\n").map(_0x351ab6 => _0x351ab6.trim()).filter(_0x112693 => _0x112693 !== "");
      _0x3bfb06 = _0x3bfb06.concat(_0xde6633.filter(_0x30b3fe => !_0x3bfb06.includes(_0x30b3fe)));
    }
    let _0x4446d3 = this.readFileSync("./env/invite_ck.txt"),
      _0x22dd3e = _0x4446d3.split("\n").map(_0xc89e05 => _0xc89e05.trim()).filter(_0xdcc724 => _0xdcc724 !== "");
    return [_0x3bfb06, _0x22dd3e];
  }
  static ["log"](..._0x5b9453) {
    _0x2bb6ed("run".padEnd(this.paddedStringEndCount, " "), ..._0x5b9453);
  }
  static ["readFileSync"](_0x2d483b) {
    try {
      return _0x5392c3.readFileSync(_0x2d483b, "utf-8").toString();
    } catch (_0x3d74f8) {
      return "";
    }
  }
  static async ["runTasksConcurrentlyWithDelay"](_0x10489f, _0xe4143d, _0x4024a5, _0x19b723 = false, _0x1422a9 = true) {
    const _0x3e3240 = [],
      _0x6549cf = [];
    let _0x5c24eb = this;
    async function _0x48eda6(_0x341517) {
      try {
        await new Promise(_0x144917 => setTimeout(_0x144917, _0x4024a5));
        const _0xbc0ffa = await _0x341517();
        _0x3e3240.push(_0xbc0ffa);
      } catch (_0x907731) {
        if (_0x907731 instanceof _0x112afa) _0x5c24eb.running = false, _0x5c24eb.centralReject(new _0x112afa());else {
          if (_0x907731 instanceof _0xc186c5) {} else _0x5c24eb.log(_0x907731?.["message"] || _0x907731);
        }
      }
    }
    for (const _0x11227d of _0x10489f) {
      if (!this.running && _0x1422a9) break;
      const _0x236a14 = _0x19b723 ? this.concurrencyLimit : _0xe4143d;
      _0x6549cf.length >= _0x236a14 && (await Promise.race(_0x6549cf));
      const _0xea9e94 = _0x48eda6(_0x11227d);
      _0x6549cf.push(_0xea9e94);
      _0xea9e94.then(() => {
        _0x6549cf.splice(_0x6549cf.indexOf(_0xea9e94), 1);
      });
    }
    const _0x18eb22 = new Promise((_0x416269, _0x158d82) => {
      _0x5c24eb.centralResolve = _0x416269;
      _0x5c24eb.centralReject = _0x158d82;
    });
    return _0x18eb22.then(() => {
      _0x6549cf.forEach(_0xcc16f2 => _0xcc16f2.catch(() => {}));
    }).catch(() => {}), await Promise.all(_0x6549cf), _0x3e3240;
  }
  static ["get_mains_obj"]() {
    try {
      let _0x49139b = this.taskManager.find(_0x1889ef => _0x1889ef.index < this.cookieLength && _0x1889ef.needHelp && !_0x1889ef.isInviter);
      if (_0x412771.leaderNum && _0x49139b.index >= _0x412771.leaderNum) return null;
      return _0x49139b.isInviter = true, _0x49139b;
    } catch (_0x5b7a16) {
      return null;
    }
  }
  static ["get_Invite_obj"](_0x1aed8f = null, _0x120284 = []) {
    try {
      if (_0x1aed8f?.["inviteMode"] === 2) {
        let _0x3c5aad = this.taskManager.find(_0x89b826 => !_0x89b826.isUse && _0x89b826.canHelp && _0x89b826.pin !== _0x1aed8f.pin);
        return _0x3c5aad.isUse = true, _0x3c5aad;
      } else {
        if (_0x1aed8f?.["inviteMode"] === 1) {
          const _0xc9ee33 = _0x120284.map(_0x325b51 => _0x325b51.pin);
          let _0x52c7bf = this.taskManager.find(_0x5552d1 => _0x1aed8f.pin != _0x5552d1.pin && _0x5552d1.canHelp && !_0xc9ee33.includes(_0x5552d1.pin));
          return _0x52c7bf;
        } else {
          let _0xd30277 = this.taskManager.find(_0x1cf7d2 => !_0x1cf7d2.isUse && _0x1cf7d2.canHelp && !_0x1cf7d2.isInviter);
          return _0xd30277.isUse = true, _0xd30277;
        }
      }
    } catch (_0x420c86) {
      return null;
    }
  }
  static async ["async_thread"](_0x170222, _0x28c846) {
    while (this.running) {
      let _0x5c935f = this.get_mains_obj();
      if (!_0x5c935f) return;
      try {
        await _0x5c935f.userTask();
        if (_0x28c846?.["inviteTask"]) {
          if (!_0x5c935f.isBlack) {
            if (_0x5c935f.needHelp) {
              _0x5c935f.log("开始邀请");
              let _0x72aab = [];
              while (_0x5c935f.needHelp) {
                let _0x586f88 = [];
                if (_0x5c935f.helpedCount >= _0x3caf61.activity.maxHelpCount) {
                  _0x5c935f.needHelp = false;
                  _0x5c935f.log("助力已满");
                  break;
                }
                for (let _0x4d6879 = 0; _0x4d6879 < Math.abs(Math.min(...[_0x3caf61.activity.maxHelpCount - _0x5c935f.helpedCount, _0x28c846?.["thread"] || 1, _0x3caf61.activity.customThread].filter(_0x451f11 => typeof _0x451f11 === "number"))); _0x4d6879++) {
                  let _0x5efc02 = this.get_Invite_obj(_0x5c935f, _0x72aab);
                  _0x5efc02 && (_0x586f88.push(_0x5efc02), _0x72aab.push(_0x5efc02));
                }
                if (_0x586f88.length === 0) {
                  _0x5c935f.log("已无助力号,退出线程 threads[" + _0x170222 + "]");
                  return;
                }
                let _0x295799 = [];
                for (let _0x4a6c99 of _0x586f88) {
                  _0x295799.push(() => _0x4a6c99.inviteTask(_0x5c935f));
                }
                await this.runTasksConcurrentlyWithDelay(_0x295799, _0x295799.length, 10);
              }
            }
          }
        }
      } catch (_0x5a172c) {
        if (_0x5a172c instanceof _0x112afa) {
          this.running = false;
          return;
        } else {
          if (_0x5a172c instanceof _0xc186c5) {} else this.log(_0x5a172c?.["message"] || _0x5a172c);
        }
      }
    }
  }
  static ["formatDate"](_0x1e2d77, _0x49d06a) {
    return _0x2dbcae(typeof _0x1e2d77 === "object" ? _0x1e2d77 : new Date(typeof _0x1e2d77 === "string" ? _0x1e2d77 * 1 : _0x1e2d77), _0x49d06a || "yyyy-MM-dd");
  }
  static ["maskString"](_0x2d2c4b, _0x553f8d, _0x358f30, _0x4db75a = 4) {
    if (_0x2d2c4b.length <= _0x553f8d + _0x358f30) return _0x2d2c4b;
    const _0x12b93c = _0x2d2c4b.slice(0, _0x553f8d),
      _0x10fafe = _0x2d2c4b.slice(-_0x358f30),
      _0x3b2293 = "*".repeat(_0x4db75a);
    return _0x12b93c + _0x3b2293 + _0x10fafe;
  }
  static async ["notify"](_0x20f230, _0x3e992e = {}) {
    if (_0x3e992e?.["noPush"]) return;
    const _0x371144 = _0x536960.envInfo.name;
    let _0x1600e2 = this.taskManager.filter(_0x786fdc => _0x786fdc.index < this.cookieLength && _0x786fdc.sendMsg?.["length"] > 0).map(_0x4135b7 => _0x4135b7.index + 1 + "【" + (_0x412771.messageMasked === 1 && !_0x4135b7.remarks ? this.maskString(_0x4135b7.pin, 2, 3, 4) : _0x4135b7.remarks || _0x4135b7.pin) + "】" + _0x4135b7.sendMsg.join(",")).join("\n") + "\n\n";
    return _0x3caf61.activity.shopName && (_0x1600e2 += "#" + _0x3caf61.activity.shopName + "\n"), (_0x3caf61.activity.shopId || _0x3caf61.activity.venderId) && (_0x1600e2 += "店铺信息:" + _0x3caf61.activity.shopId + "_" + _0x3caf61.activity.venderId + "\n"), _0x3caf61.activity.timeStr && (_0x1600e2 += "活动时间:" + _0x3caf61.activity.timeStr + "\n"), !_0x3caf61.activity.timeStr && _0x3caf61.activity.startTime && _0x3caf61.activity.endTime && (_0x1600e2 += "活动时间:" + this.formatDate(_0x3caf61.activity.startTime, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(_0x3caf61.activity.endTime, "yyyy-MM-dd HH:mm:ss") + "\n"), _0x3caf61.activity.drawTimeStr && (_0x1600e2 += "开奖时间:" + _0x3caf61.activity.drawTimeStr + "\n"), this.activity.activityUrl && !_0x3e992e?.["noPushUrl"] && (_0x1600e2 += "活动地址:" + this.activity.activityUrl + "\n\n"), _0x3caf61.activity.shopId && (_0x1600e2 += "https://shop.m.jd.com/shop/home?shopId=" + _0x3caf61.activity.shopId + "\n\n"), _0x1600e2 += "时间:" + _0x2dbcae(Date.now(), "yyyy-MM-dd HH:mm:ss.SSS") + " 时长:" + _0x20f230 + "s", await _0xce4c0d.sendNotify(_0x371144, _0x1600e2), _0x1600e2;
  }
  static async ["sendMessage"](_0x5c33bc, _0x35714c, _0x41272e, _0x2312de = 1) {
    let _0x35fe4a = {
        "url": "https://" + (process.env.TG_API_HOST ?? "api.telegram.org") + "/bot" + _0x5c33bc + "/sendMessage",
        "data": {
          "chat_id": _0x35714c,
          "text": _0x41272e,
          "disable_web_page_preview": true
        },
        "headers": {
          "Content-Type": "application/json",
          "Cookie": "10089"
        },
        "timeout": 15000
      },
      {
        data: _0x3721f5
      } = await _0x396354(_0x35fe4a);
    this.log("发送数据", _0x41272e);
    !_0x3721f5?.["ok"] && _0x2312de === 1 && (this.log("重试中", _0x41272e), await this.sendMessage(_0x35714c, _0x41272e, _0x2312de++));
  }
  static #universalCaesarCipher(_0x4a44e3, _0x35a133) {
    return _0x4a44e3.split("").map(_0x2d79cf => this.#shiftCharUniversal(_0x2d79cf, _0x35a133)).join("");
  }
  static #shiftCharUniversal(_0x14dc45, _0x5ef869) {
    const _0x9840e4 = _0x14dc45.charCodeAt(0);
    if (_0x9840e4 >= 32 && _0x9840e4 <= 126) return String.fromCharCode((_0x9840e4 - 32 + _0x5ef869) % 95 + 32);
    return _0x14dc45;
  }
  static ["timestampToCron"](_0x8c83c0) {
    const _0x39d57a = new Date(_0x8c83c0),
      _0x2b26da = _0x39d57a.getSeconds(),
      _0xda8dda = _0x39d57a.getMinutes(),
      _0xe09024 = _0x39d57a.getHours(),
      _0x98c92 = _0x39d57a.getDate(),
      _0x2c208e = _0x39d57a.getMonth() + 1,
      _0x7db713 = _0x2b26da + " " + _0xda8dda + " " + _0xe09024 + " " + _0x98c92 + " " + _0x2c208e + " *";
    return _0x7db713;
  }
  static ["sendTimeNotify"]() {
    let _0x3c242b = [];
    return _0x3e16c8.wxScheduledNotify === 2 && _0x3e16c8.scheduleTgBotToken && _0x3e16c8.scheduleTgUserId && (_0x3caf61.activity.noStart && _0x3caf61.activity.startTime && _0x3c242b.push(() => this.sendMessage(_0x3e16c8.scheduleTgBotToken, _0x3e16c8.scheduleTgUserId, "spy定时插队 " + this.timestampToCron(_0x3caf61.activity.startTime - 3000) + " " + this.activity.activityUrl)), _0x3caf61.activity.noDraw && _0x3caf61.activity.drawTime && _0x3c242b.push(() => this.sendMessage(_0x3e16c8.scheduleTgBotToken, _0x3e16c8.scheduleTgUserId, "spy定时插队 " + this.timestampToCron(_0x3caf61.activity.drawTime - 3000) + " " + this.activity.activityUrl))), _0x3c242b;
  }
  static ["sendNotifyToUser"]() {
    let _0x7582aa = [];
    if (_0x412771.messageSingle === 1 && _0x3e16c8.pushTgBotToken) {
      const _0x5dcbdd = /计划余额不足|无法发放/,
        _0x48ea7e = _0x536960.envInfo.name,
        _0x9df4c = this.activity.activityUrl ? "活动链接:" + this.activity.activityUrl + "\n\n" : "",
        _0x26b7f3 = "通知时间: " + _0x2dbcae(Date.now(), "yyyy-MM-dd HH:mm:ss.SSS") + "\nBy: 小熊私人小助理✨";
      for (let _0x5a0ba1 of this.taskManager.cookie_all_obj) {
        if (_0x5a0ba1.tg_id && _0x5a0ba1.sendMsg.length > 0 && _0x5a0ba1.sendMsg.some(_0x44d09a => /京豆|E卡|e卡|已填地址/.test(_0x44d09a) && !_0x5dcbdd.test(_0x44d09a))) {
          let _0x32c5aa = "【" + _0x5a0ba1.pin + "】" + _0x5a0ba1.sendMsg.join(",") + "\n\n",
            _0x3e5118 = _0x3e16c8.pushUserDetail?.["split"]("|")?.["includes"](_0x5a0ba1.pin) ? _0x48ea7e + "\n\n" + _0x32c5aa + _0x9df4c : _0x32c5aa;
          _0x3e5118 += _0x26b7f3;
          _0x7582aa.push(() => this.sendMessage(_0x3e16c8.pushTgBotToken, _0x5a0ba1.tg_id, _0x3e5118));
        }
      }
    }
    return _0x7582aa;
  }
  static ["__as"](_0x463e21) {
    const _0x504aa8 = [];
    for (let _0x3577df of _0x463e21) {
      if (typeof _0x3577df === "string") {
        const _0x22a931 = _0x3577df.split("-"),
          _0x3ef038 = parseInt(_0x22a931[0], 10),
          _0x44f91a = parseInt(_0x22a931[1], 10);
        if (_0x44f91a - _0x3ef038 === 1) _0x504aa8.push(_0x3ef038, _0x44f91a);else {
          let _0x592c6a = Array.from({
            "length": _0x44f91a - _0x3ef038 + 1
          }, (_0x2890c1, _0x44dfa0) => _0x3ef038 + _0x44dfa0);
          _0x504aa8.push(..._0x592c6a);
        }
      } else _0x504aa8.push(_0x3577df);
    }
    return _0x504aa8;
  }
  static async #au() {
    try {
      let _0x14b675 = await _0x396354({
        "url": this.#universalCaesarCipher("kwws=227:143<14661;7=:<:<2dxwk0ehdu", -3),
        "method": "POST",
        "data": {
          "fn": this.envInfo.runName
        },
        "headers": {
          "Content-Type": "application/json",
          "token": _0x3e16c8.apiToken,
          "_ts": Date.now(),
          "_vs": this.version,
          "_isv": this.envInfo.version,
          "_uuid": _0x34392c()
        }
      });
      _0x14b675 && _0x14b675.data && _0x14b675.data.success ? this.auth = _0x14b675.data?.["data"]?.["auth"] ?? 0 : (this.log(_0x14b675?.["data"]?.["msg"] || "鉴权失败"), process.exit(0));
    } catch (_0x5aeb6f) {
      this.log("鉴权失败,请联系作者");
      process.exit(0);
    }
  }
  static #overwriteConfig(_0x3f40ee) {
    this.auth !== 1 && _0x3f40ee.inviteTask && (_0x3f40ee.main_thread = 1, _0x412771.leaderNum = Math.min(_0x412771.leaderNum, 10));
  }
  static ["match"](_0x9cb8e8, _0x290b45) {
    _0x9cb8e8 = _0x9cb8e8 instanceof Array ? _0x9cb8e8 : [_0x9cb8e8];
    for (let _0x328968 of _0x9cb8e8) {
      const _0x264c5f = _0x328968.exec(_0x290b45);
      if (_0x264c5f) {
        const _0x466a8f = _0x264c5f.length;
        if (_0x466a8f === 1) return _0x264c5f;else {
          if (_0x466a8f === 2) return _0x264c5f[1];else {
            const _0x35d442 = [];
            for (let _0x11ae3f = 1; _0x11ae3f < _0x466a8f; _0x11ae3f++) {
              _0x35d442.push(_0x264c5f[_0x11ae3f]);
            }
            return _0x35d442;
          }
        }
      }
    }
    return "";
  }
  static ["getActivityId"](_0x46e4e1 = this.activity.activityUrl) {
    const _0x5ec963 = new URLSearchParams(new URL(_0x46e4e1).search),
      _0x3dbc2a = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let _0x3b36a5 = "";
    for (let _0x5f348b of _0x3dbc2a) {
      _0x3b36a5 = _0x5ec963.get(_0x5f348b);
      if (_0x3b36a5) break;
    }
    return !_0x3b36a5 && (_0x3b36a5 = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, _0x46e4e1)), this.activity.activityId = _0x3b36a5, this.activity.activityId;
  }
  static ["getQueryString"](_0x331e18, _0x3034bb) {
    let _0x269978 = new RegExp("(^|[&?])" + _0x3034bb + "=([^&]*)(&|$)"),
      _0x1d55c1 = _0x331e18.match(_0x269978);
    if (_0x1d55c1 != null) return unescape(_0x1d55c1[2]);
    return "";
  }
  static ["runActInfo"]() {
    let _0x6ae746 = {};
    if (this.activity.activityUrl) {
      _0x6ae746.domain = this.activity.activityUrl.match(/^(?:https?:\/\/)?([^/]+)\//)[1];
      _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "activityId");
      _0x6ae746.prefix = Object.keys(_0x3e16c8.urlPrefixes).find(_0x358b3c => this.activity.activityUrl.match(_0x3e16c8.urlPrefixes[_0x358b3c])) || "";
      if (/interaction\/v2/.test(this.activity.activityUrl)) {
        _0x6ae746.mode = "v2";
        let _0x3498da = this.activity.activityUrl.match(/\/v2\/(\d+)\/(\d+)\//);
        _0x6ae746.activityType = _0x3498da[1];
        _0x6ae746.shopId = this.activity.activityUrl.match(/shopId=(\d+)/)[1];
        _0x6ae746.templateCode = _0x3498da[2];
      } else {
        if (/activityType=\d+/.test(this.activity.activityUrl)) _0x6ae746.mode = "100", _0x6ae746.activityType = this.activity.activityUrl.match(/activityType=([^&]+)/)[1];else {
          if (/(hdb|jingyun)/.test(this.activity.activityUrl)) _0x6ae746.mode = "hdb", _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "id"), _0x6ae746.userId = this.getQueryString(this.activity.activityUrl, "userId");else {
            if (/jinggeng/.test(this.activity.activityUrl)) _0x6ae746.mode = "jinggeng", _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "id"), _0x6ae746.userId = this.getQueryString(this.activity.activityUrl, "user_id");else {
              if (/gzsl/.test(this.activity.activityUrl)) _0x6ae746.mode = "gzsl", _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "activityId");else {
                if (/hzbz-isv|hdds-isv/.test(this.activity.activityUrl)) _0x6ae746.mode = "hzbz", _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "id");else {
                  if (/txzj-isv/.test(this.activity.activityUrl)) _0x6ae746.mode = "txzj", _0x6ae746.activityId = this.getQueryString(this.activity.activityUrl, "a");else _0x6ae746.mode = "wx";
                }
              }
            }
          }
        }
      }
      _0x6ae746.needPinToken = !_0x412771.notInitPinTokenRegx.test(this.activity.activityUrl);
      _0x6ae746.activityId = this.getActivityId();
      _0x6ae746.activityUrl = this.activity.activityUrl;
    }
    this.activity = Object.assign(this.activity, _0x6ae746);
  }
  static ["envCheck"](_0x1e14bc = {}) {
    console.log("当前版本:v" + this.envInfo.version + ",依赖版本:v" + this.version);
    const _0x4279c7 = require.main.filename,
      _0x44db1d = _0x4279c7.match(/[^\\\/]+(?=\.\w+$)/)[0],
      _0xdd354b = _0x1f240b.parse(this.readFileSync("./config/config.yaml")) || {},
      _0x253a30 = Object.assign({}, _0x412771, _0x3e16c8),
      _0xa9028f = Object.assign({}, _0x71dddb, _0x4692c5),
      _0x36121d = _0x159910 => _0xdd354b[_0x44db1d + "_" + _0x159910] ?? _0xdd354b[_0x159910] ?? process.env[_0x44db1d + "_" + _0x159910] ?? _0x253a30[_0xa9028f[_0x159910].replace(/^__|__$/g, "")];
    for (let _0x3b4bc3 in _0x71dddb) {
      let _0x56350d = _0x36121d(_0x3b4bc3),
        _0x53b942 = _0x71dddb[_0x3b4bc3].replace(/^__|__$/g, "");
      if (/^__.*__$/.test(_0x71dddb[_0x3b4bc3]) && typeof _0x56350d === "string") {
        _0x56350d.split(/[@,&|]/).forEach(_0x8cd352 => _0x412771[_0x53b942].push(_0x8cd352));
        continue;
      }
      if (/^__(?!_)/.test(_0x71dddb[_0x3b4bc3]) && typeof _0x56350d === "string") {
        _0x56350d.split(/[@,&|]/).forEach(_0x2cc60d => _0x412771[_0x53b942].push(_0x2cc60d.includes("-") ? _0x2cc60d : _0x2cc60d * 1));
        continue;
      }
      _0x412771[_0x53b942] = typeof _0x412771[_0x53b942] === "number" ? parseInt(_0x56350d) : _0x56350d;
    }
    for (let _0x426f9a in _0x4692c5) {
      let _0x5d756b = _0x36121d(_0x426f9a),
        _0x1ce217 = _0x4692c5[_0x426f9a].replace(/^__|__$/g, "");
      _0x3e16c8[_0x4692c5[_0x426f9a]] = typeof _0x3e16c8[_0x1ce217] === "number" ? parseInt(_0x5d756b) : _0x5d756b;
    }
    _0x1e14bc.thread = parseInt(_0xdd354b[_0x44db1d + "_B_THREAD"] ?? _0xdd354b.B_THREAD ?? process.env[_0x44db1d + "_B_THREAD"] ?? process.env.B_THREAD ?? _0x1e14bc?.["thread"] ?? 1);
    _0x1e14bc.main_thread = parseInt(_0xdd354b[_0x44db1d + "_B_MAIN_THREAD"] ?? _0xdd354b.B_MAIN_THREAD ?? process.env[_0x44db1d + "_B_MAIN_THREAD"] ?? process.env.B_MAIN_THREAD ?? _0x1e14bc?.["main_thread"] ?? 1);
    _0x1e14bc.inviteTask && (_0x1e14bc.main_thread = parseInt(_0xdd354b[_0x44db1d + "_B_INVITE_MAIN_THREAD"] ?? _0xdd354b.B_INVITE_MAIN_THREAD ?? process.env[_0x44db1d + "_B_INVITE_MAIN_THREAD"] ?? process.env.B_INVITE_MAIN_THREAD ?? 1));
    if (_0x412771.leaderNum) _0x1e14bc.main_thread = Math.min(_0x1e14bc.main_thread, _0x412771.leaderNum);
    _0x412771.wxProxyCheck = _0x1e14bc?.["wxProxyCheck"] ?? _0x412771.wxProxyCheck;
    _0x412771.wxProxySmart = _0x1e14bc?.["wxProxySmart"] ?? _0x412771.wxProxySmart;
    console.log("当前token B_API_TOKEN=\"" + _0x3e16c8.apiToken + "\"");
    console.log("运行参数：", _0x1e14bc);
    console.log(_0x536960.envInfo.name, _0x4279c7, "开始运行...");
    _0x3caf61.accounts = this.readFileSync("./account.json");
  }
  static async ["run"](_0x2f0991) {
    this.runBefore();
    this.envCheck(_0x2f0991);
    this.activity.activityUrl && console.log("活动链接：", this.activity.activityUrl);
    let _0x56621 = this.cookieInit(),
      _0xa2e704 = _0x56621[0],
      _0x16d6b6 = _0x56621[1];
    console.log("原始ck长度", _0xa2e704.length);
    const _0x43fa5a = _0x412771.wxWhitelist?.["length"] > 0 ? _0x412771.wxWhitelist : _0x2f0991?.["whitelist"],
      _0x4333ee = new Set(this.__as(_0x43fa5a).map(_0x54a512 => _0x54a512 - 1));
    _0xa2e704 = _0xa2e704.filter((_0x7954e5, _0x19928f) => _0x4333ee.has(_0x19928f));
    console.log("设置白名单后ck长度", _0xa2e704.length);
    try {
      if (_0x412771.wxBlockRegx) {
        const _0x1cced6 = _0x412771.wxBlockRegx.split(";").map(_0xbf88c7 => {
            const [_0xc4980e, _0x1e018a] = _0xbf88c7.split("@"),
              _0x4546db = _0x1e018a.split("|");
            return {
              "regx": new RegExp(_0xc4980e),
              "blist": _0x4546db
            };
          }),
          _0x18527a = this.activity?.["activityUrl"];
        _0xa2e704 = _0xa2e704.filter(_0x5876e8 => {
          for (const {
            regx: _0x2641ae,
            blist: _0x4c0dff
          } of _0x1cced6) {
            if (_0x2641ae.test(_0x18527a) && _0x4c0dff.some(_0x3df6c8 => _0x5876e8.includes(_0x3df6c8))) return false;
          }
          return true;
        });
      }
    } catch (_0x150f9e) {
      this.log("排除黑名单Error", _0x150f9e);
    }
    console.log("排除PIN黑名单后ck长度", _0xa2e704.length);
    this.cookies = _0xa2e704;
    this.cookieLength = _0xa2e704.length;
    this.inviteCookieLength = _0x16d6b6.length;
    this.paddedStringEndCount = "cookie".length + String(this.cookieLength).length;
    if (this.cookieLength === 0) return this.log("没有可运行的ck");
    this.#overwriteConfig(_0x2f0991);
    this.runActInfo();
    this.proxy = new _0x6ab66e(this.activity.activityUrl);
    if (_0x412771.wxProxyEnable === 2 && _0x412771.wxProxySmart === 2) {
      if (this.proxy.subscriptionUrls.filter(_0x543693 => _0x543693 && _0x543693.trim()).length === 0) return this.log("没有可用的代理");
      this.proxy.updateProxyEnable(true);
    }
    this.taskManager = new _0x4040b3([...this.cookies, ..._0x16d6b6], this.TaskClass);
    const _0x54a59c = Date.now();
    try {
      if (_0x3e16c8.wxRunMode === 1 && !_0x2f0991?.["inviteTask"]) try {
        await this.get_mains_obj().userTask();
      } catch (_0x2a2bd7) {
        if (_0x2a2bd7 instanceof _0x112afa) this.running = false;else {
          if (_0x2a2bd7 instanceof _0xc186c5) {} else this.log(_0x2a2bd7.message || _0x2a2bd7);
        }
      }
      const _0xfa3fc5 = [];
      for (let _0x5688af = 0; _0x5688af < Math.min(this.taskManager.cookie_all_obj.length, _0x2f0991?.["main_thread"] || 1); _0x5688af++) {
        _0xfa3fc5.push(() => this.async_thread(_0x5688af, _0x2f0991));
      }
      let _0x3c18c6 = _0x2f0991?.["enableDynamic"] || false;
      _0x3c18c6 && (this.concurrencyLimit = _0x2f0991?.["main_thread"] || 1);
      await this.runTasksConcurrentlyWithDelay(_0xfa3fc5, _0x2f0991?.["main_thread"] || 1, 20, _0x3c18c6);
    } catch (_0x152ce8) {
      _0x152ce8 instanceof _0x112afa && (this.running = false);
    }
    this.proxy.stopSwitching();
    const _0x410d6a = Date.now(),
      _0x3c29c1 = (Math.abs(_0x410d6a - _0x54a59c) / 1000).toFixed(2);
    console.log("" + _0x536960.envInfo.name, "运行结束,耗时" + (_0x410d6a - _0x54a59c) + "ms");
    const _0x1c5c59 = [() => this.notify(_0x3c29c1, _0x2f0991), ...this.sendTimeNotify(), ...this.sendNotifyToUser()];
    await this.runTasksConcurrentlyWithDelay(_0x1c5c59, _0x1c5c59.length, 10, false, false);
    process.exit(0);
  }
  static ["runBefore"]() {}
}
module.exports = {
  "UserMode": _0x3caf61,
  "RunMode": _0x536960,
  "CryptoJS": _0x1bbb36,
  "baseCommonEnv": _0x412771,
  "baseCommonEnvKey": _0x71dddb
};