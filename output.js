//Wed Jul 24 2024 05:42:58 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const l1liiii1 = require("https"),
  IliilIlI = require("axios"),
  iIl1llII = require("qs"),
  II11il11 = require("crypto-js"),
  iiliilll = require("base-64"),
  i111lii1 = require("node-rsa"),
  l1I11II1 = require("fs"),
  ilI1il = require("path"),
  {
    format: i1I1IlI1
  } = require("date-fns"),
  Il1ii11 = require("./jdCookie.js"),
  {
    HttpsProxyAgent: IIIlIII1
  } = require("https-proxy-agent"),
  l1ii1ii1 = require("tls"),
  lIl1ii = require("cheerio"),
  llillIi1 = require("yaml"),
  lIIII11l = require("url"),
  {
    machineIdSync: IIlI1iII
  } = require("node-machine-id"),
  liIliiiI = require("./sendNotify"),
  iIl1111 = require("winston"),
  IIiI11l1 = require("events"),
  ilIiilII = new IIiI11l1(),
  {
    AbortController: li1Iil1
  } = require("abort-controller");
let i1il1i1l = ["来晚了", "已发完", "参数缺失或无效", "超出活动计划时间", "奖品发送失败", "发放完", "全部被领取", "余额不足", "已结束", "活动已经结束", "未开始", "此京豆计划已经结束", "已经发完", "活动不存在"];
process.env.B_WX_STOP_KEYWORD ? process.env.B_WX_STOP_KEYWORD.split(/[@,&|]/).forEach(iII1i1Ii => i1il1i1l.push(iII1i1Ii)) : "";
let ill1iIl = ["京豆", "红包", "券", "再来一次", "客服"],
  IillIl11 = ["下单满", "签收后", "收到货后", "成功购买任意", "必须购买店铺内"];
process.env.B_WX_ADDRESS_STOP_KEYWORD ? process.env.B_WX_ADDRESS_STOP_KEYWORD.split(/[@,&|]/).forEach(l1liI => ill1iIl.push(l1liI)) : "";
process.env.B_WX_ADDRESS_STOP_KEYWORD_RULE ? process.env.B_WX_ADDRESS_STOP_KEYWORD_RULE.split(/[@,&|]/).forEach(I1I1liIi => IillIl11.push(I1I1liIi)) : "";
let ilIii1l1 = [];
process.env.B_WX_WHITELIST ? process.env.B_WX_WHITELIST.split(/[@,&|]/).forEach(iI1I11iI => ilIii1l1.push(iI1I11iI.includes("-") ? iI1I11iI : iI1I11iI * 1)) : [];
let ilIi1IiI = ["10052"];
process.env.B_WX_OPEN_CARD_TYPES ? process.env.B_WX_OPEN_CARD_TYPES.split(/[@,&|]/).forEach(ii1ili1l => ilIi1IiI.push(ii1ili1l)) : "";
const iIl1IlI1 = {
    "wxProxyEnable": parseInt(process.env.B_WX_PROXY_ENABLE || "2"),
    "wxProxyUrl": process.env.B_WX_PROXY_URL || "",
    "wxProxySmart": parseInt(process.env.B_WX_PROXY_SMART || "2"),
    "wxProxyInterval": parseInt(process.env.B_WX_PROXY_INTERVAL || 120),
    "wxProxyMode": parseInt(process.env.B_WX_PROXY_MODE || "1"),
    "wxProxyCheck": parseInt(process.env.B_WX_PROXY_CHECK || "2"),
    "proxyRegx": process.env.B_WX_PROXY_ENABLE_REGEXP ? process.env.B_WX_PROXY_ENABLE_REGEXP : "(Request failed with status code (403|407|493|429|497|500|502|503|504))|certificate|timeout|ECONNRESET|ECONNREFUSED|ETIMEDOUT|(tunneling socket could not be established)|(socket hang up)|(CONNECT response)|(socket disconnected)",
    "isvObfuscatorRetry": parseInt(process.env?.["B_WX_ISVOBFUSCATOR_RETRY"] || 1),
    "isvObfuscatorRetryWait": parseInt(process.env?.["B_WX_ISVOBFUSCATOR_RETRY_WAIT"] || 2),
    "notInitPinTokenRegx": /lorealjdcampaign-rc.isvjcloud.com|interaction/,
    "messageMasked": parseInt(process.env.B_WX_MESSAGE_MASKED || "2"),
    "messageSingle": parseInt(process.env.B_WX_MESSAGE_SINGLE || "2"),
    "addressUseNum": parseInt(process.env.B_WX_ADDRESS_USE_NUM || "0"),
    "saveAddressMode": parseInt(process.env.B_WX_SAVE_ADDRESS_MODE || "1"),
    "wxBlockRegx": process.env.B_WX_BLOCK_PIN_REGX || "",
    "wxEnableOtherEnv": parseInt(process.env.B_WX_ENABLE_OTHER_ENV || "1"),
    "timeoutDuration": parseInt(process.env.B_WX_TIMEOUT_DURATION || "30"),
    "reTryRegx": "(哎呀活动火爆，请稍后再试|活动太火爆了|活动过于火爆|服务器数据忙|奖品与您擦肩而过了哟)",
    "retryCount": parseInt(process.env.B_RETRY_COUNT || "20"),
    "proxyRetryCount": parseInt(process.env.B_PROXY_RETRY_COUNT || "5"),
    "immediatelyExit": parseInt(process.env.B_IMMEDIATE_EXIT || "0"),
    "showProxyRetryLog": parseInt(process.env.B_SHOW_PROXY_RETRY_LOG || "1"),
    "redisCacheEnable": parseInt(process.env.B_REDIS_CACHE_ENABLE || "2"),
    "redisUrl": process.env.B_REDIS || "",
    "logger": null,
    "logToFile": parseInt(process.env.B_LOG_TO_FILE || "2"),
    "stopKeywords": i1il1i1l,
    "addressStopKeywords": ill1iIl,
    "addressStopKeywordsRule": IillIl11,
    "wxWhitelist": ilIii1l1,
    "openCardTypes": ilIi1IiI
  },
  iiIll1i = {
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
    "B_WX_SAVE_ADDRESS_MODE": "saveAddressMode",
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
    "B_SHOW_PROXY_RETRY_LOG": "showProxyRetryLog",
    "B_REDIS_CACHE_ENABLE": "redisCacheEnable",
    "B_REDIS": "redisUrl",
    "B_LOG_TO_FILE": "logToFile"
  },
  iI111l1i = {
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
  iIliIIII = {
    "B_WX_RUN_MODE": "wxRunMode",
    "B_WX_SCHEDULE": "wxScheduledNotify",
    "B_API_TOKEN": "apiToken",
    "B_WX_DEBUG_INFO": "showDebugInfo",
    "PUSH_USER_DETAIL": "pushUserDetail",
    "PUSH_TG_BOT_TOKEN": "pushTgBotToken",
    "SCHEDULE_TG_BOT_TOKEN": "scheduleTgBotToken",
    "SCHEDULE_TG_USER_ID": "scheduleTgUserId"
  };
iI111l1i.mode && (iIl1IlI1.wxEnableOtherEnv = 2);
let I1lli11i;
try {
  I1lli11i = require("ioredis");
} catch (iI1lllI) {
  console.log("未安装redis依赖,禁用redis缓存");
  iIl1IlI1.redisRequire = 2;
}
class iiiIIIll extends Error {
  constructor(liiliII1) {
    super(liiliII1);
    this.name = "customAssert";
  }
}
class i1I1IiII extends Error {
  constructor(lI11II1) {
    super(lI11II1);
    this.name = "customStop";
  }
}
class lllli1iI extends Error {
  constructor(IlilillI) {
    super(IlilillI);
    this.name = "Aborted";
  }
}
function liI1l1II(...liliil) {
  const I1l1iiI = new Date(),
    I1ll1IIl = i1I1IlI1(I1l1iiI, "yyyy-MM-dd HH:mm:ss.SSS"),
    l1IliI1 = liliil.map(I1ll1iii => {
      if (I1ll1iii && I1ll1iii.constructor === Object) return JSON.stringify(I1ll1iii);
      return I1ll1iii;
    });
  console.log(I1ll1IIl, ...l1IliI1);
}
function i1l1ilIl(II1Iliii = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return II1Iliii.replace(/[xy]/g, function (iillil1i) {
    const lill1lI = 16 * Math.random() | 0,
      iiiiilli = "x" === iillil1i ? lill1lI : 3 & lill1lI | 8;
    return iiiiilli.toString(36);
  });
}
class liiIIll {
  constructor(IiiIliI = {}) {
    const IliIII1 = iIl1111.format.printf(({
        level: I1iil1ii,
        message: l1lllIl1,
        timestamp: lIll111I,
        tag: I1iliI1l
      }) => {
        const iIlilll = i1I1IlI1(lIll111I, "HH:mm:ss.SSS"),
          liI1l1i = 5,
          lii11lli = I1iil1ii.toUpperCase().padEnd(liI1l1i, " ");
        return iIlilll + "|" + lii11lli + "|" + l1lllIl1;
      }),
      IlIil1il = [new iIl1111.transports.Console()];
    if (IiiIliI.logToFile) {
      const lil1IIl1 = IiiIliI.filename || i1I1IlI1(new Date(), "yyyy-MM-dd_HH-mm-ss");
      IlIil1il.push(new iIl1111.transports.File({
        "filename": "./logs/" + lil1IIl1 + ".log"
      }));
    }
    this.logger = iIl1111.createLogger({
      "level": IiiIliI.level || "debug",
      "format": iIl1111.format.combine(iIl1111.format.timestamp(), IliIII1),
      "transports": IlIil1il
    });
    ["error", "warn", "info", "debug"].forEach(IIi1lii => {
      this[IIi1lii] = (...lllIil1I) => {
        const lIi1i1I = lllIil1I.map(lll1l => {
          if (lll1l === undefined) return "undefined";else {
            if (lll1l === null) {
              return "null";
            } else {
              if (typeof lll1l === "object") return JSON.stringify(lll1l);else {
                return lll1l;
              }
            }
          }
        }).join(" ");
        this.logger.log(IIi1lii, lIi1i1I);
      };
    });
  }
}
class Iiii1li1 {
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
  static ["generatePhoneInfo"](IiIliiIl = null) {
    const I1iII1ll = this.phones[Math.floor(Math.random() * this.phones.length)],
      i1l1IIiI = this.ivs.slice(I1iII1ll.ivsRange[0], I1iII1ll.ivsRange[1]),
      lii1II1I = i1l1IIiI[Math.floor(Math.random() * i1l1IIiI.length)],
      I1llIii = {
        "12.4.2": "169143",
        "12.4.3": "169159",
        "12.4.4": "169175",
        "12.6.0": "169204",
        "12.6.2": "169227"
      },
      Iil1i = Object.keys(I1llIii),
      li1i111 = IiIliiIl === null ? Iil1i[Math.floor(Math.random() * Iil1i.length)] : IiIliiIl;
    return {
      "phone": I1iII1ll.model,
      "screen": I1iII1ll.screen,
      "tf": I1iII1ll.tf,
      "iv": lii1II1I,
      "clientVersion": li1i111,
      "build": I1llIii[li1i111],
      "uuid": i1l1ilIl()
    };
  }
}
function i11IIIli(lIl11iIi, I1ll1llI, i1Il1lii) {
  const illiliI = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
  function lI1I11il(iilIlli1) {
    iilIlli1 = iilIlli1.split("").reverse().join("");
    const liiIl1I = new Uint8Array(12),
      IlIlil1I = new TextEncoder().encode(iilIlli1);
    for (let iiiIi1ii = 0; iiiIi1ii < IlIlil1I.length; iiiIi1ii += 2) {
      let lii1il1i = IlIlil1I[iiiIi1ii] << 5 | IlIlil1I[iiiIi1ii + 1] & 255;
      lii1il1i %= 63;
      liiIl1I[iiiIi1ii >> 1] = lii1il1i;
    }
    let iIiiIIl1 = "";
    for (let llill1ll = 0; llill1ll < liiIl1I.length; llill1ll++) {
      iIiiIIl1 += (liiIl1I[llill1ll] + 256).toString(2).slice(1);
    }
    let il11IllI = "",
      Il1l111 = "";
    for (let II111iil = 0; II111iil < 16; II111iil++) {
      if (II111iil !== 0) {
        const ililllll = II111iil * 6,
          iIIIiIl = iIiiIIl1.substring(ililllll, ililllll + 6);
        let I11iIii1 = parseInt(iIIIiIl, 2);
        const liiI1llI = Il1l111.split("");
        for (let iI1iiIIi = 0; iI1iiIIi < liiI1llI.length; iI1iiIIi++) {
          liiI1llI[iI1iiIIi] === "1" && (I11iIii1 = (I11iIii1 >> 6 - iI1iiIIi | I11iIii1 << iI1iiIIi) & 63);
        }
        Il1l111 = (I11iIii1 & 63).toString(2).padStart(6, "0");
      } else Il1l111 = iIiiIIl1.substring(0, 6);
      il11IllI += Il1l111;
    }
    for (let Il1lIlII = 0; Il1lIlII < 12; Il1lIlII++) {
      const lilii1I1 = Il1lIlII * 8;
      liiIl1I[Il1lIlII] = parseInt(il11IllI.substring(lilii1I1, lilii1I1 + 8), 2);
    }
    const iilIi1li = btoa(String.fromCharCode.apply(null, liiIl1I));
    return iilIi1li;
  }
  let I1illil1 = Date.now() + parseInt(i1Il1lii);
  typeof lIl11iIi != "object" && (lIl11iIi = JSON.parse(lIl11iIi));
  lIl11iIi.nowTime = I1illil1;
  let liiiiIil = I1ll1llI + I1illil1;
  const l1llllI1 = liiiiIil.substring(0, liiiiIil.length - 5);
  let il1iI1l = "";
  for (let l1111ilI = 0; l1111ilI < l1llllI1.length; l1111ilI++) {
    let IIi1Iii = l1llllI1.charCodeAt(l1111ilI),
      I1i1I = IIi1Iii % 10,
      llili1 = illiliI[I1i1I][l1111ilI];
    il1iI1l += llili1;
  }
  var iilIlill = il1iI1l.length,
    lIi1lIII = Math.floor(iilIlill / 24),
    i11llil1 = "";
  for (var ll1iIiI1 = 0; ll1iIiI1 < 24; ll1iIiI1++) {
    var lIllIll1 = (ll1iIiI1 + 1) * lIi1lIII;
    if (ll1iIiI1 === 23) {
      lIllIll1 = iilIlill;
    }
    var lllIilIl = il1iI1l.substring(ll1iIiI1 * lIi1lIII, lIllIll1),
      IiIii111 = [];
    for (var llii11I1 = 0; llii11I1 < lllIilIl.length; llii11I1++) {
      IiIii111.push(lllIilIl.charCodeAt(llii11I1));
    }
    var IIiiiil1 = IiIii111.reduce(function (iliiliIl, I1iiIiIi) {
        return iliiliIl + I1iiIiIi;
      }, 0),
      Iil11Iii = Math.floor(IIiiiil1 / IiIii111.length);
    i11llil1 += String.fromCharCode(Iil11Iii);
  }
  il1iI1l = i11llil1;
  const llI1iI1l = lI1I11il(il1iI1l),
    i11I1lli = II11il11.enc.Utf8.parse(llI1iI1l),
    illli111 = II11il11.enc.Utf8.parse(""),
    iIIii1l = II11il11.AES.encrypt(JSON.stringify(lIl11iIi), i11I1lli, {
      "iv": illli111,
      "mode": II11il11.mode.ECB,
      "padding": II11il11.pad.Pkcs7
    });
  return iIIii1l.toString();
}
function I1II1lIl(Iil1i1I1 = {}) {
  const l1ili1I = {
      "method": "get",
      "timeout": 30000
    },
    iIlI111I = Object.assign({}, l1ili1I, Iil1i1I1),
    Iil11ilI = IliilIlI.CancelToken.source(),
    llII1i11 = iIlI111I.timeout || 20000,
    IiI11li1 = setTimeout(() => {
      Iil11ilI.cancel("Request canceled due to timeout (" + llII1i11 + " ms)");
    }, llII1i11);
  return IliilIlI({
    ...iIlI111I,
    "cancelToken": Iil11ilI.token
  }).then(liIii1Ii => {
    return clearTimeout(IiI11li1), liIii1Ii;
  }).catch(l1i1lI1 => {
    clearTimeout(IiI11li1);
    throw l1i1lI1;
  });
}
function II1li1II(ll11ilii) {
  if (ll11ilii.proxy) {
    const IIIlII1I = new IIIlIII1(ll11ilii.proxy),
      l11llil1 = IIIlII1I.addRequest;
    return IIIlII1I.addRequest = function (ilI1ii, iIll1II1, lI11II1l) {
      return Object.assign(iIll1II1, ll11ilii.tlsOptions, {
        "ciphers": ll11ilii.tlsOptions?.["ciphers"] || l1ii1ii1.DEFAULT_CIPHERS
      }), l11llil1.call(this, ilI1ii, iIll1II1, lI11II1l);
    }, IIIlII1I;
  }
  const II1iIl11 = new l1liiii1.Agent({
    ...ll11ilii.tlsOptions,
    "ciphers": ll11ilii.tlsOptions?.["ciphers"] || l1ii1ii1.DEFAULT_CIPHERS
  });
  return II1iIl11;
}
class l11i111 {
  constructor(ll1lIi1i, lI11Ii1) {
    this.ua = ll1lIi1i;
    this.pin = lI11Ii1;
    this.av = ll1lIi1i.slice(ll1lIi1i.indexOf("/") + 1);
    this.sua = ll1lIi1i.substring(ll1lIi1i.indexOf("(") + 1, ll1lIi1i.indexOf(")"));
    this.random = this.#randomString(10, true);
    this.cacheInfo = {};
  }
  #getRandomString(iIil1Iii, IlliilIi) {
    let iiIiIiIi = "",
      lllili1i = iIil1Iii.split("");
    for (let IIilllI = 0; IIilllI < IlliilIi; IIilllI++) {
      let liI1IiIl = Math.floor(Math.random() * lllili1i.length);
      iiIiIiIi += lllili1i[liI1IiIl];
    }
    return iiIiIiIi;
  }
  #randomString(lillIlll, iiIliIl1) {
    var Illiil1I = "",
      l1I1iiil = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var liIl1ii1 = 0; liIl1ii1 < lillIlll; liIl1ii1++) {
      var lIli11lI = l1I1iiil;
      liIl1ii1 === 0 && iiIliIl1 && (lIli11lI = l1I1iiil.slice(1));
      var l11li11I = Math.round(Math.random() * (lIli11lI.length - 1));
      Illiil1I += lIli11lI.substring(l11li11I, l11li11I + 1);
    }
    return Illiil1I;
  }
  #generateFp(ii1ii11I) {
    let iIll1liI = 3,
      iIiIlili = "0123456789",
      IIilIili = 12;
    if (ii1ii11I === "4.4") iIll1liI = 4, iIiIlili = "1uct6d0jhq", IIilIili = 11;else {
      if (ii1ii11I === "4.3") {
        iIll1liI = 3;
        iIiIlili = "kl9i1uct6d";
        IIilIili = 12;
      } else {
        if (ii1ii11I == "4.2") iIll1liI = 4, iIiIlili = "6d0jhqw3pa", IIilIili = 11;else ii1ii11I == "4.1" && (iIll1liI = 6, iIiIlili = "uct6d0jhqw", IIilIili = 9);
      }
    }
    let iilIl1ii,
      iiil1Iii = "";
    do {
      iilIl1ii = this.#getRandomString(iIiIlili, 1);
      iiil1Iii.indexOf(iilIl1ii) == -1 && (iiil1Iii += iilIl1ii);
    } while (iiil1Iii.length < iIll1liI);
    for (let l1IiiIi of iiil1Iii.slice()) {
      iIiIlili = iIiIlili.replace(l1IiiIi, "");
    }
    let li11iliI = Math.floor(Math.random() * 10),
      IilIi1Il = this.#getRandomString(iIiIlili, li11iliI) + iiil1Iii + this.#getRandomString(iIiIlili, IIilIili - li11iliI) + li11iliI,
      lII11i1I = IilIi1Il.split(""),
      IliII11;
    if (ii1ii11I === "4.4") {
      let IlIiiI1i = lII11i1I.slice(0, 8),
        lli1li11 = lII11i1I.slice(8),
        i1iIilIi = IlIiiI1i.reverse();
      IliII11 = i1iIilIi.map(i11Iil1i => (35 - parseInt(i11Iil1i, 36)).toString(36));
      IliII11.push(...lli1li11);
    } else {
      if (ii1ii11I === "4.3") {
        let IiIlI1il = lII11i1I.slice(0, 10),
          l1Iill1I = lII11i1I.slice(10),
          lIlll1II = IiIlI1il.reverse();
        IliII11 = lIlll1II.map(llIiII1I => (35 - parseInt(llIiII1I, 36)).toString(36));
        IliII11.push(...l1Iill1I);
      } else {
        if (ii1ii11I === "4.1" || ii1ii11I === "4.2") {
          let l1iIl11l = lII11i1I.slice(0, 14),
            li1iill = lII11i1I.slice(14),
            IlllIlll = l1iIl11l.reverse();
          IliII11 = IlllIlll.map(ilIll1Il => (35 - parseInt(ilIll1Il, 36)).toString(36));
          IliII11.push(...li1iill);
        } else IliII11 = lII11i1I.reverse().map(IIii11ll => 9 - parseInt(IIii11ll));
      }
    }
    let IiIIlIl1 = IliII11.join("");
    return IiIIlIl1;
  }
  #generateExpandParams(iii11ili, IIl1ii11, lli11li1) {
    let i1IiiiIl = {};
    if (lli11li1 === "4.4") i1IiiiIl = {
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
      "ai": iii11ili,
      "fp": IIl1ii11
    };else {
      if (lli11li1 === "4.3") {
        i1IiiiIl = {
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
          "ai": iii11ili,
          "fp": IIl1ii11
        };
      } else {
        if (lli11li1 === "4.2") i1IiiiIl = {
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
          "ai": iii11ili,
          "fp": IIl1ii11
        };else lli11li1 === "4.1" ? i1IiiiIl = {
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
          "ai": iii11ili,
          "fp": IIl1ii11
        } : i1IiiiIl = {
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
          "ai": iii11ili,
          "fp": IIl1ii11
        };
      }
    }
    return II11il11.AES.encrypt(JSON.stringify(i1IiiiIl, null, 2), II11il11.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
      "iv": II11il11.enc.Utf8.parse("0102030405060708"),
      "mode": II11il11.mode.CBC,
      "padding": II11il11.pad.Pkcs7
    }).ciphertext.toString(II11il11.enc.Hex);
  }
  async #getAlgo(II1iil1i, IIiiI11, ii1I1Iii, i1llIlIi, lliiIlii = 0) {
    let Ii1llIII = "",
      llll1ili = {
        "version": i1llIlIi,
        "fp": IIiiI11,
        "fv": "v3.2.0",
        "appId": II1iil1i,
        "timestamp": Date.now(),
        "platform": "web",
        "expandParams": ii1I1Iii
      };
    if (i1llIlIi === "4.4") llll1ili.fv = "h5_file_v4.4.0";else {
      if (i1llIlIi === "4.3") llll1ili.fv = "h5_file_v4.3.1";else {
        if (i1llIlIi === "4.2") llll1ili.fv = "h5_file_v4.2.0";else i1llIlIi === "4.1" && (llll1ili.fv = "v1.6.1");
      }
    }
    try {
      let IIll1l1 = await IliilIlI({
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "method": "post",
        "data": llll1ili,
        "headers": {
          "User-Agent": this.ua
        }
      });
      if (IIll1l1.status == 200) {
        let iIIllI1I = IIll1l1.data.data.result;
        Ii1llIII = {
          "tk": iIIllI1I.tk,
          "fp": iIIllI1I.fp,
          "rd": /(?<=rd=')[^']*/.exec(iIIllI1I.algo)[0],
          "algo": /(?<=algo\.)[^(]*/.exec(iIIllI1I.algo)[0]
        };
      }
      return Ii1llIII;
    } catch (i11lili) {
      console.log("algo error");
      if (lliiIlii < 3) {
        return this.#getAlgo(II1iil1i, IIiiI11, ii1I1Iii, i1llIlIi, lliiIlii + 1);
      }
      throw i11lili;
    }
  }
  #test(li1ii1ll, I1i1l111, ll11lIiI, Iiii11l1, I1ilI1, iiilIilI, lIliIli) {
    let l1lilill = lIliIli === "4.4" ? "88" : lIliIli === "4.3" ? "22" : lIliIli === "4.2" ? "74" : lIliIli === "4.1" ? "04" : "",
      ili1i1li = "" + I1i1l111 + li1ii1ll + ll11lIiI + l1lilill + Iiii11l1 + I1ilI1;
    return II11il11[iiilIilI](ili1i1li, I1i1l111).toString(II11il11.enc.Hex);
  }
  async ["encrypt"](Iil1li1, llIllilI, il1lllIi, lIiIi1l1, IIi1I1ii, l1iIIiI, l11lIiIl, ill1iIIl) {
    if (!(Iil1li1 in this.cacheInfo)) {
      let iiii11iI = this.#generateFp(ill1iIIl);
      const iIilIl1 = this.#generateExpandParams(Iil1li1, iiii11iI, ill1iIIl);
      let iIlI11I1 = 0,
        iiIiIi1l;
      while (iIlI11I1 < 3) {
        iiIiIi1l = await this.#getAlgo(Iil1li1, iiii11iI, iIilIl1, ill1iIIl);
        if (iiIiIi1l !== "") break;
        iIlI11I1++;
      }
      this.cacheInfo[Iil1li1] = iiIiIi1l;
    }
    const {
        tk: I11iII1,
        rd: lii11lll,
        fp: lI11I1i,
        algo: lI1i1l
      } = this.cacheInfo[Iil1li1],
      ll111i11 = new Date(),
      I1i1i1I1 = i1I1IlI1(ll111i11, "yyyyMMddHHmmssSSS"),
      li1IIIli = this.#test(lI11I1i, I11iII1, I1i1i1I1, Iil1li1, lii11lll, lI1i1l, ill1iIIl),
      iiiI11lI = typeof il1lllIi == "object" ? JSON.stringify(il1lllIi) : il1lllIi,
      IlliI1i1 = II11il11.SHA256(iiiI11lI).toString(II11il11.enc.Hex);
    let iIli1ii1 = "appid:" + lIiIi1l1 + "&body:" + IlliI1i1;
    IIi1I1ii != null && (iIli1ii1 += "&client:" + IIi1I1ii);
    l1iIIiI != null && (iIli1ii1 += "&clientVersion:" + l1iIIiI);
    iIli1ii1 += "&functionId:" + llIllilI;
    l11lIiIl != null && (iIli1ii1 += "&t:" + l11lIiIl);
    let lIIIliI1, IiI1lI1i, IilIl1i1;
    if (ill1iIIl === "4.4") IiI1lI1i = {
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
      "fp": lI11I1i,
      "bu1": "0.1.9"
    }, IilIl1i1 = "r1T.6Vinpb.k+/a)", lIIIliI1 = II11il11.MD5("" + li1IIIli + iIli1ii1 + li1IIIli).toString(II11il11.enc.Hex);else {
      if (ill1iIIl === "4.3") lIIIliI1 = II11il11.HmacSHA256(iIli1ii1, li1IIIli).toString(II11il11.enc.Hex), IiI1lI1i = {
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
        "fp": lI11I1i
      }, IilIl1i1 = "&d74&yWoV.EYbWbZ";else {
        if (ill1iIIl === "4.2") lIIIliI1 = II11il11.SHA256("" + li1IIIli + iIli1ii1 + li1IIIli).toString(II11il11.enc.Hex), IiI1lI1i = {
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
          "fp": lI11I1i
        }, IilIl1i1 = "DNiHi703B0&17hh1";else ill1iIIl === "4.1" ? (lIIIliI1 = II11il11.MD5("" + li1IIIli + iIli1ii1 + li1IIIli).toString(II11il11.enc.Hex), IiI1lI1i = {
          "sua": this.sua,
          "pp": {
            "p2": this.pin
          },
          "random": this.random,
          "referer": "",
          "v": "v0.1.6",
          "fp": lI11I1i
        }, IilIl1i1 = "HL4|FW#Chc3#q?0)") : (lIIIliI1 = II11il11.HmacSHA256(iIli1ii1, li1IIIli).toString(II11il11.enc.Hex), IiI1lI1i = {
          "sua": this.sua,
          "pp": {
            "p1": this.pin
          },
          "fp": lI11I1i
        }, IilIl1i1 = "wm0!@w_s#ll1flo(");
      }
    }
    const li1i1lii = II11il11.AES.encrypt(JSON.stringify(IiI1lI1i, null, 2), II11il11.enc.Utf8.parse(IilIl1i1), {
        "iv": II11il11.enc.Utf8.parse("0102030405060708"),
        "mode": II11il11.mode.CBC,
        "padding": II11il11.pad.Pkcs7
      }).ciphertext.toString(II11il11.enc.Hex),
      l1iiiIIl = I1i1i1I1 + ";" + lI11I1i + ";" + Iil1li1 + ";" + I11iII1 + ";" + lIIIliI1 + ";" + ill1iIIl + ";" + ll111i11.getTime() + ";" + li1i1lii;
    let II11iIl1 = {
      "functionId": llIllilI,
      "body": iiiI11lI,
      "appid": lIiIi1l1,
      "client": IIi1I1ii,
      "clientVersion": l1iIIiI,
      "h5st": l1iiiIIl,
      "t": l11lIiIl
    };
    return l11lIiIl == null && delete II11iIl1.t, IIi1I1ii == null && delete II11iIl1.client, l1iIIiI == null && delete II11iIl1.clientVersion, II11iIl1;
  }
}
class i1l1iil {
  constructor() {}
  static #get_uuid(I1Iii1iI = 40) {
    if (I1Iii1iI === 0) return "0";else {
      const llll1il = this.#get_uuid(I1Iii1iI - 1).replace(/^0+/, ""),
        iiiiIII = "0123456789abcdef";
      return llll1il + iiiiIII[Math.floor(Math.random() * (iiiiIII.length - 6))];
    }
  }
  static #_md5(i1lI1i) {
    const llIllIll = II11il11.MD5(i1lI1i);
    return llIllIll.toString(II11il11.enc.Hex);
  }
  static #sub_v2(iliIl1) {
    const iI1l1llI = [55, 146, 68, 104, 165, 61, 204, 127, 187, 15, 217, 136, 238, 154, 233, 90],
      i111llI1 = Buffer.from("80306f4370b39fd5630ad0529f77adb6", "utf-8");
    let iIIlilIi = new Array(i111llI1.length).fill(0);
    for (let II1Il11 in iliIl1) {
      let l1I11I1 = Number(iliIl1[II1Il11]),
        ilIIII1I = iI1l1llI[II1Il11 & 15],
        lilil1l = Number(i111llI1[II1Il11 & 7]);
      l1I11I1 = ilIIII1I ^ l1I11I1;
      l1I11I1 = l1I11I1 ^ lilil1l;
      l1I11I1 = l1I11I1 + ilIIII1I;
      ilIIII1I = ilIIII1I ^ l1I11I1;
      let ii11l1li = Number(i111llI1[II1Il11 & 7]);
      ilIIII1I = ilIIII1I ^ ii11l1li;
      iIIlilIi[II1Il11] = ilIIII1I & 255;
    }
    return iIIlilIi;
  }
  static #getSign(il111i11, l1IIlI, lii1l11I, l11Il1l1, lIiiIII) {
    let llli1Ii = Date.now().toString(),
      lll1IIIl = [[0, 2], [1, 1], [2, 0]],
      ii11il1l = lll1IIIl[Math.floor(Math.random() * lll1IIIl.length)],
      l1lllIi1 = "1" + ii11il1l[0] + ii11il1l[1],
      l11Iii1l = "functionId=" + il111i11 + "&body=" + l1IIlI + "&openudid=" + lii1l11I + "&client=" + l11Il1l1 + "&clientVersion=" + lIiiIII + "&st=" + llli1Ii + "&sv=" + l1lllIi1,
      IIl11Ill = this.#sub_v2(Buffer.from(l11Iii1l, "utf-8")),
      I1li1IIl = this.#_md5(Buffer.from(IIl11Ill).toString("base64"));
    return [llli1Ii, l1lllIi1, I1li1IIl];
  }
  static ["getSignData"](iiI1I11i, iI1lll11, l1li1II1) {
    iI1lll11 = JSON.stringify(iI1lll11);
    const {
      screen: ilil1lII,
      tf: i1iiii1I,
      iv: iIiiI1iI,
      clientVersion: IIIiI1II,
      build: iIi1ll1i,
      uuid: Ii1Ii1II
    } = l1li1II1;
    let lI1Il1ll = "apple",
      llliliii = this.#getSign(iiI1I11i, iI1lll11, Ii1Ii1II, lI1Il1ll, IIIiI1II),
      lillilil = llliliii[0],
      IliIIi1I = llliliii[1],
      iIi1I1Ii = llliliii[2];
    const lI1ll11i = {
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": Math.floor(Date.now() / 1000),
        "ridx": -1,
        "cipher": {
          "screen": this.#base64Encode(ilil1lII),
          "uuid": this.#base64Encode(Ii1Ii1II),
          "osVersion": this.#base64Encode(iIiiI1iI),
          "openudid": this.#base64Encode(Ii1Ii1II),
          "area": this.#base64Encode(this.#generateRandomString(2, "123456789") + "_" + this.#generateRandomString(4, "123456789") + "_" + this.#generateRandomString(4, "123456789") + "_" + this.#generateRandomString(4, "123456789"))
        },
        "ciphertype": 5,
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile"
      },
      lIi1lIi = "eidAd71c8121f9s8+" + this.#generateRandomString(20) + "fqJmY9A07YRSnQkMEOU2Z7Jq3GnZeeGG0FqhUU0MoA1PiifL5yWcPJxtp1Cb/b/GsK0GqxuDyDfYZx6";
    return {
      "functionId": iiI1I11i,
      "body": iI1lll11,
      "build": iIi1ll1i,
      "client": lI1Il1ll,
      "clientVersion": IIIiI1II,
      "d_brand": "apple",
      "d_model": "iPhone" + i1iiii1I,
      "st": lillilil,
      "sv": IliIIi1I,
      "sign": iIi1I1Ii,
      "ef": 1,
      "ep": JSON.stringify(lI1ll11i),
      "eid": lIi1lIi,
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
  static #generateRandomString(l1iII1ll, lIliIili = null) {
    const il11I1Il = lIliIili == null ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" : lIliIili;
    let I1ii1ilI = "";
    for (let llliiIll = 0; llliiIll < l1iII1ll; llliiIll++) {
      const IIiilIil = Math.floor(Math.random() * il11I1Il.length);
      I1ii1ilI += il11I1Il.charAt(IIiilIil);
    }
    return I1ii1ilI;
  }
  static #base64Encode(i11Ii1Il) {
    const i1i111I = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      li1I1lIl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      lliliiIi = iiliilll.encode(i11Ii1Il),
      liilIII = lliliiIi.split("").map(II1llI1l => {
        const i1I1lIll = i1i111I.indexOf(II1llI1l);
        return i1I1lIll !== -1 ? li1I1lIl[i1I1lIll] : II1llI1l;
      }).join("");
    return liilIII;
  }
}
class I11I1l1I {
  constructor(lIIlIlII) {
    const lllii1ii = {
      ...lIIlIlII,
      "retryStrategy"(iIli111I) {
        return null;
      },
      "maxRetriesPerRequest": 1
    };
    this.redis = new I1lli11i(lllii1ii);
    this.expiryCache = new Set();
    this.redis.on("error", il111ilI => {
      iIl1IlI1.redisConnect = 2;
    });
    this.connected = new Promise((Illl1, iIii1i1I) => {
      this.redis.on("ready", Illl1);
      this.redis.on("error", Illl1);
    });
  }
  async ["set"](Il11I11i, iilillil, i11ilIIi) {
    if (i11ilIIi) {
      await this.redis.set(Il11I11i, iilillil, "EX", i11ilIIi);
    } else {
      await this.redis.set(Il11I11i, iilillil);
    }
  }
  async ["get"](liIliiIi) {
    return await this.redis.get(liIliiIi);
  }
  async ["del"](ilIi1llI) {
    return await this.redis.del(ilIi1llI);
  }
  async ["exists"](lII1Ii1) {
    return await this.redis.exists(lII1Ii1);
  }
  async ["incr"](lllili1) {
    return await this.redis.incr(lllili1);
  }
  async ["decr"](lI11l1il) {
    return await this.redis.decr(lI11l1il);
  }
  async ["expire"](iilIIlI1, l1i1liii) {
    return await this.redis.expire(iilIIlI1, l1i1liii);
  }
  async ["ttl"](IIIIi1lI) {
    return await this.redis.ttl(IIIIi1lI);
  }
  async ["hset"](iiIIIIIi, iIlli111, iIIiil1l) {
    return await this.redis.hset(iiIIIIIi, iIlli111, iIIiil1l);
  }
  async ["hget"](lll1IlII, lilll1li) {
    return await this.redis.hget(lll1IlII, lilll1li);
  }
  async ["hdel"](il1i1lli, lI1liIiI) {
    return await this.redis.hdel(il1i1lli, lI1liIiI);
  }
  async ["hgetall"](i11illii) {
    return await this.redis.hgetall(i11illii);
  }
  async ["rpush"](I11IIliI, iIlI1II1) {
    return await this.redis.rpush(I11IIliI, iIlI1II1);
  }
  async ["lpush"](I11iIlIi, l1lIi11) {
    return await this.redis.lpush(I11iIlIi, l1lIi11);
  }
  async ["lpop"](i1II) {
    return await this.redis.lpop(i1II);
  }
  async ["rpop"](I1lIi1ll) {
    return await this.redis.rpop(I1lIi1ll);
  }
  async ["lrange"](I1I1l1I1, Ill1iili, IIi1) {
    return await this.redis.lrange(I1I1l1I1, Ill1iili, IIi1);
  }
  async ["llen"](i1li1iiI) {
    return await this.redis.llen(i1li1iiI);
  }
  async ["quit"]() {
    return await this.redis.quit();
  }
  async ["sadd"](iii1l1ii, il11i11l, liI1iii1) {
    const iIiIlIi1 = await this.redis.sadd(iii1l1ii, il11i11l);
    return liI1iii1 && !this.expiryCache.has(iii1l1ii) && (await this.redis.expire(iii1l1ii, liI1iii1), this.expiryCache.add(iii1l1ii)), iIiIlIi1;
  }
  async ["sismember"](iIlIiIII, l11Il1Ii) {
    return await this.redis.sismember(iIlIiIII, l11Il1Ii);
  }
}
class IlIIlIli {
  static ["activity"] = {};
  static ["msg"] = [];
  static ["proxyIp"] = null;
  static ["proxyIpTime"] = null;
  static ["addressList"] = [];
  static ["isSaveAddress"] = false;
  static ["redis"] = null;
  constructor(II1IlI1I, iliIIIi1) {
    Object.assign(this, Iii1iI1i.activity);
    this.cookie = iliIIIi1;
    this.savedCookies = {};
    this.ticket = "";
    this.index = II1IlI1I;
    this.pin = this.userPin(iliIIIi1);
    this.remarks = "";
    this.tg_id = "";
    this.address = null;
    this.phoneInfo = Iiii1li1.generatePhoneInfo();
    this.ua = this.userAgent();
    this.headers = {
      "Cookie": iliIIIi1,
      "User-Agent": this.ua.app
    };
    this.retryCount = iIl1IlI1.retryCount;
    this.proxyRetryCount = iIl1IlI1.proxyRetryCount;
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
    this.openCardTypes = iIl1IlI1.openCardTypes;
    this.otherHeaders = {};
    this.h5st = new l11i111(this.headers["User-Agent"], this.pin);
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
  ["getActivityId"](l1iII11 = this.activityUrl) {
    const liIi1Il1 = new URLSearchParams(new URL(l1iII11).search),
      IIIll1li = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let i1Iillil = "";
    for (let I1iIlIIi of IIIll1li) {
      i1Iillil = liIi1Il1.get(I1iIlIIi);
      if (i1Iillil) break;
    }
    return !i1Iillil && (i1Iillil = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, l1iII11)), this.activityId = i1Iillil, this.activityId;
  }
  ["log"](...I1Il1lI) {
    iIl1IlI1.logger.info("main |" + ("" + (this.index + 1)).padEnd(Iii1iI1i.paddedStringEndCount, " ") + "|" + (this.remarks || this.pin) + "|", ...I1Il1lI);
  }
  ["debug"](...lI1illiI) {
    iIl1IlI1.logger.debug("main |" + ("" + (this.index + 1)).padEnd(Iii1iI1i.paddedStringEndCount, " ") + "|" + (this.remarks || this.pin) + "|", ...lI1illiI);
  }
  ["error"](...I11I1) {
    iIl1IlI1.logger.error("main |" + ("" + (this.index + 1)).padEnd(Iii1iI1i.paddedStringEndCount, " ") + "|" + (this.remarks || this.pin) + "|", ...I11I1);
  }
  ["warn"](...l1i11II1) {
    iIl1IlI1.logger.warn("main |" + ("" + (this.index + 1)).padEnd(Iii1iI1i.paddedStringEndCount, " ") + "|" + (this.remarks || this.pin) + "|", ...l1i11II1);
  }
  ["putMsg"](iIIi1l1l, il1IlIl1 = false) {
    if (!iIIi1l1l) return;
    iIIi1l1l += "";
    this.log(iIIi1l1l);
    let illi1iii = [[" ", ""], ["优惠券", "券"], ["东券", "券"], ["店铺", ""], ["恭喜", ""], ["获得", ""]];
    for (let lIi1lilI of illi1iii) {
      iIIi1l1l = iIIi1l1l.replace(lIi1lilI[0], lIi1lilI[1]);
    }
    if (!iIIi1l1l) return;
    this.sendMsg.push(iIIi1l1l);
  }
  ["union"](iIliiiil, iIlll11I) {
    return iIliiiil.concat(iIlll11I.filter(I1iIlIll => !iIliiiil.includes(I1iIlIll)));
  }
  ["intersection"](l1II1i11, ll1I1i1I) {
    return l1II1i11.filter(ii1l1ii => ll1I1i1I.includes(ii1l1ii));
  }
  ["different"](iIi1iII, iIi1li1l) {
    return iIi1iII.concat(iIi1li1l).filter(Illl1ili => iIi1iII.includes(Illl1ili) && !iIi1li1l.includes(Illl1ili));
  }
  ["unique"](iIiIl1i) {
    return Array.from(new Set(iIiIl1i));
  }
  ["formatDate"](i11ilI11, IIlIlli) {
    return i1I1IlI1(typeof i11ilI11 === "object" ? i11ilI11 : new Date(typeof i11ilI11 === "string" ? i11ilI11 * 1 : i11ilI11), IIlIlli || "yyyy-MM-dd");
  }
  ["dateStringToTimestamp"](I1lliIlI, i1il1111) {
    const lIiiillI = parse(I1lliIlI, i1il1111 || "yyyy-MM-dd HH:mm", new Date()),
      i11Iil11 = lIiiillI.getTime();
    return i11Iil11;
  }
  ["match"](II1lIlIi, lI1ilIIl) {
    II1lIlIi = II1lIlIi instanceof Array ? II1lIlIi : [II1lIlIi];
    for (let I1iiiIi1 of II1lIlIi) {
      const I1li1lli = I1iiiIi1.exec(lI1ilIIl);
      if (I1li1lli) {
        const l1iIiIIl = I1li1lli.length;
        if (l1iIiIIl === 1) return I1li1lli;else {
          if (l1iIiIIl === 2) {
            return I1li1lli[1];
          } else {
            const iI11iIIi = [];
            for (let Iill1il1 = 1; Iill1il1 < l1iIiIIl; Iill1il1++) {
              iI11iIIi.push(I1li1lli[Iill1il1]);
            }
            return iI11iIIi;
          }
        }
      }
    }
    return "";
  }
  ["matchAll"](ili11IIi, Illi111l) {
    ili11IIi = ili11IIi instanceof Array ? ili11IIi : [ili11IIi];
    let iiI11III,
      l1IiIii1 = [];
    for (let IiIlli1I of ili11IIi) {
      while ((iiI11III = IiIlli1I.exec(Illi111l)) != null) {
        let iiIiIl1i = iiI11III.length;
        if (iiIiIl1i === 1) l1IiIii1.push(iiI11III);else {
          if (iiIiIl1i === 2) l1IiIii1.push(iiI11III[1]);else {
            let iliIiIil = [];
            for (let IiIlllI1 = 1; IiIlllI1 < iiIiIl1i; IiIlllI1++) {
              iliIiIil.push(iiI11III[IiIlllI1]);
            }
            l1IiIii1.push(iliIiIil);
          }
        }
      }
    }
    return l1IiIii1;
  }
  ["haskey"](l1lI11ii, Il1IIlil) {
    const IlliI1l1 = Il1IIlil.split(".");
    let l1II111l = l1lI11ii;
    for (const i111lIi1 of IlliI1l1) {
      if (l1II111l && l1II111l.hasOwnProperty(i111lIi1)) l1II111l = l1II111l[i111lIi1];else return undefined;
    }
    return l1II111l;
  }
  ["parseJSON"](lliiiIi) {
    try {
      const IiiIlili = JSON.parse(lliiiIi);
      return IiiIlili;
    } catch (l1iiliil) {
      return false;
    }
  }
  ["json2Str"](iIIl11i) {
    try {
      return JSON.stringify(iIIl11i);
    } catch (ilI1I1l) {
      return "";
    }
  }
  ["str2Json"](i11I1Iil) {
    try {
      return JSON.parse(i11I1Iil);
    } catch (iIiiliii) {
      return i11I1Iil;
    }
  }
  ["textToHtml"](IIIlIiI1) {
    return lIl1ii.load(IIIlIiI1);
  }
  ["encodeChineseParamsInUrl"](li1ilIlI) {
    const Il1lI11l = lIIII11l.parse(li1ilIlI, true);
    let ll1liii1 = Il1lI11l.query || {};
    if (typeof ll1liii1 !== "object" || Array.isArray(ll1liii1)) {
      ll1liii1 = {};
    }
    const i1ilIII = {};
    Object.keys(ll1liii1).forEach(lIlli111 => {
      const Illli = ll1liii1[lIlli111];
      if (typeof Illli === "string" && /[\u4e00-\u9fa5]/.test(Illli)) i1ilIII[lIlli111] = encodeURIComponent(Illli);else {
        i1ilIII[lIlli111] = Illli;
      }
    });
    const il1IIl11 = Object.keys(i1ilIII).map(lii11lIi => encodeURIComponent(lii11lIi) + "=" + i1ilIII[lii11lIi]).join("&");
    let I1ll11I = Il1lI11l.protocol + "//" + Il1lI11l.host + Il1lI11l.pathname;
    if (il1IIl11) {
      I1ll11I += "?" + il1IIl11;
    }
    return I1ll11I;
  }
  ["encodeChineseParams"](lIIl11i) {
    const II111iIi = new URL(lIIl11i),
      II1i111i = new URLSearchParams(II111iIi.search);
    for (const [il11I1l, i1lI1] of II1i111i) {
      /[\u4e00-\u9fa5]/.test(i1lI1) && II1i111i.set(il11I1l, encodeURIComponent(i1lI1));
    }
    return II111iIi.search = II1i111i.toString(), II111iIi.toString();
  }
  ["sleep"](iIiIlll1, i1i1IIli) {
    let I11IlIll = iIiIlll1;
    if (i1i1IIli !== undefined) {
      I11IlIll = Math.floor(Math.random() * (i1i1IIli - iIiIlll1 + 1)) + iIiIlll1;
    }
    return new Promise(IIliIIil => setTimeout(IIliIIil, I11IlIll));
  }
  ["wait"](llli111l, liIIi1l) {
    if (llli111l < 0) {
      return;
    }
    if (liIIi1l) {
      return new Promise(Ii1iIil => setTimeout(Ii1iIil, this.random(llli111l, liIIi1l)));
    } else {
      return new Promise(lI1I111I => setTimeout(lI1I111I, llli111l));
    }
  }
  ["stop"]() {
    this.immediatelyExit();
    throw new i1I1IiII();
  }
  async ["immediatelyExit"]() {
    if (iIl1IlI1.immediatelyExit === 1) {
      while (IlIIlIli.isSaveAddress) {
        await this.sleep(1000);
      }
      process.exit(0);
    }
  }
  ["exit"]() {
    throw new iiiIIIll();
  }
  ["random"](I1l1lIli, iliI11ii) {
    return Math.min(Math.floor(I1l1lIli + Math.random() * (iliI11ii - I1l1lIli)), iliI11ii);
  }
  ["randomNum"](l1l1l1II) {
    l1l1l1II = l1l1l1II || 32;
    let lI1Ii1li = "0123456789",
      IiIlI = lI1Ii1li.length,
      IIII1Il = "";
    for (let iII1lll = 0; iII1lll < l1l1l1II; iII1lll++) {
      IIII1Il += lI1Ii1li.charAt(Math.floor(Math.random() * IiIlI));
    }
    return IIII1Il;
  }
  ["randomArray"](IIiIilli, llIiiI) {
    llIiiI = llIiiI || IIiIilli.length;
    let IIlll1ii = IIiIilli.slice(0),
      lllilI1l = IIiIilli.length,
      il1iIl1I = lllilI1l - llIiiI,
      I1111I1i,
      l1lillIi;
    while (lllilI1l-- > il1iIl1I) {
      l1lillIi = Math.floor((lllilI1l + 1) * Math.random());
      I1111I1i = IIlll1ii[l1lillIi];
      IIlll1ii[l1lillIi] = IIlll1ii[lllilI1l];
      IIlll1ii[lllilI1l] = I1111I1i;
    }
    return IIlll1ii.slice(il1iIl1I);
  }
  ["timestamp"]() {
    return Date.now();
  }
  ["getMilliSecondsUntilTomorrow"]() {
    let li1IilII = new Date(),
      IlillII = new Date();
    IlillII.setHours(24, 0, 0, 0);
    let I1llI11 = IlillII - li1IilII;
    return I1llI11;
  }
  ["getQueryString"](IiI11Ili, IIllIll1) {
    let lllIlll1 = new RegExp("(^|[&?])" + IIllIll1 + "=([^&]*)(&|$)"),
      ii1I1i1I = IiI11Ili.match(lllIlll1);
    if (ii1I1i1I != null) return unescape(ii1I1i1I[2]);
    return "";
  }
  ["ensureDirectoryExistence"](I1i1l1lI) {
    !l1I11II1.existsSync(I1i1l1lI) && (this.ensureDirectoryExistence(ilI1il.dirname(I1i1l1lI)), l1I11II1.mkdirSync(I1i1l1lI));
  }
  ["readFileSync"](i111l1Il) {
    try {
      return l1I11II1.readFileSync(i111l1Il, "utf-8").toString();
    } catch (lliiliI) {
      return "";
    }
  }
  ["writeFileSync"](IiiIiil1, Ii1I1li, IlIiiIl1) {
    const ll1iIi1I = ilI1il.join(__dirname, IiiIiil1);
    this.ensureDirectoryExistence(ll1iIi1I);
    const lI1il111 = ilI1il.join(ll1iIi1I, Ii1I1li);
    try {
      l1I11II1.writeFileSync(lI1il111, IlIiiIl1, "utf-8");
    } catch (l1l1il1l) {
      this.log("写入文件时出错：", l1l1il1l);
    }
  }
  async ["writeFileSyncByLock"](IiIi1liI, iiliIl1l, ii1iil11) {
    const llilIl = ilI1il.join(__dirname, IiIi1liI),
      l1iiiI1I = ilI1il.join(llilIl, iiliIl1l);
    try {
      await writeFileAsync(l1iiiI1I, ii1iil11);
    } catch (II1IIiII) {
      this.log("写入文件时出错：", II1IIiII);
    }
  }
  ["readYamlSync"](iii1iI1l) {
    try {
      return llillIi1.parse(this.readFileSync(iii1iI1l)) ?? {};
    } catch (liliIliI) {
      return {};
    }
  }
  ["writeYamlSync"](IIii1, Ii1li1lI, ll1lli1l) {
    try {
      this.writeFileSync(IIii1, Ii1li1lI, llillIi1.stringify(ll1lli1l));
    } catch (IIiiIiii) {
      this.log("写入文件时出错：", IIiiIiii);
    }
  }
  ["appendFileSync"](l1li1l, iiliIlII, II1l111) {
    const lI1IIi1l = ilI1il.join(__dirname, l1li1l);
    this.ensureDirectoryExistence(lI1IIi1l);
    const IIlI1Ii1 = ilI1il.join(lI1IIi1l, iiliIlII);
    try {
      l1I11II1.appendFileSync(IIlI1Ii1, II1l111, "utf-8");
    } catch (ililIIl1) {
      this.log("写入文件时出错：", ililIIl1);
    }
  }
  async ["writeLongCache"](IIl1llii = this.activityId, iiiI1lli = this.pin, ll1i1ll = "list") {
    try {
      if (IlIIlIli.redis) {
        ll1i1ll.toLowerCase() === "list" ? await IlIIlIli.redis.sadd(IIl1llii, iiiI1lli) : await IlIIlIli.redis.set(IIl1llii, iiiI1lli);
        return;
      }
      this.appendFileSync("cache/" + Iii1iI1i.envInfo.runName, "" + IIl1llii, iiiI1lli + "\n");
    } catch (II1lI1I) {
      if (II1lI1I instanceof iiiIIIll || II1lI1I instanceof i1I1IiII) throw II1lI1I;
      this.log("writeLongCache:", II1lI1I.message);
    }
  }
  async ["writeDayCache"](i1Iii111 = this.activityId, Ii1IIilI = this.pin) {
    try {
      if (IlIIlIli.redis) {
        await IlIIlIli.redis.sadd(i1Iii111, Ii1IIilI, Math.floor(this.getMilliSecondsUntilTomorrow() / 1000) - 5);
        return;
      }
      this.appendFileSync("cache/" + Iii1iI1i.envInfo.runName, i1Iii111 + "_" + this.formatDate(this.timestamp()), Ii1IIilI + "\n");
    } catch (IiiiII) {
      if (IiiiII instanceof iiiIIIll || IiiiII instanceof i1I1IiII) throw IiiiII;
      this.log("writeDayCache:", IiiiII.message);
    }
  }
  async ["readDayCache"](l11IlIl1 = this.activityId) {
    try {
      if (IlIIlIli.redis) {
        return await IlIIlIli.redis.get(l11IlIl1);
      }
      if (IlIIlIli.activity["dayCache_" + l11IlIl1 + "_" + this.formatDate(this.timestamp())]) return IlIIlIli?.["activity"]?.["dayCache_" + l11IlIl1 + "_" + this.formatDate(this.timestamp())];
      let IiIiI11I = this.readFileSync("cache/" + Iii1iI1i.envInfo.runName + "/" + l11IlIl1 + "_" + this.formatDate(this.timestamp())).split("\n").filter(lIIi1i1 => lIIi1i1 && lIIi1i1.trim());
      return IlIIlIli.activity["dayCache_" + l11IlIl1 + "_" + this.formatDate(this.timestamp())] = IiIiI11I, IlIIlIli?.["activity"]?.["dayCache_" + l11IlIl1 + "_" + this.formatDate(this.timestamp())];
    } catch (i1l11Iii) {
      if (i1l11Iii instanceof iiiIIIll || i1l11Iii instanceof i1I1IiII) throw i1l11Iii;
      this.log("readLongCache:", i1l11Iii.message);
    }
  }
  async ["readLongCache"](liiIil = this.activityId) {
    try {
      if (IlIIlIli.redis) return await IlIIlIli.redis.get(liiIil);
      if (IlIIlIli.activity["longCache_" + liiIil]) return IlIIlIli?.["activity"]?.["longCache_" + liiIil];
      let IiIiliI1 = this.readFileSync("cache/" + Iii1iI1i.envInfo.runName + "/" + liiIil).split("\n").filter(iIlIlIi => iIlIlIi && iIlIlIi.trim());
      return IlIIlIli.activity["longCache_" + liiIil] = IiIiliI1, IlIIlIli?.["activity"]?.["longCache_" + liiIil];
    } catch (IiIlliI1) {
      if (IiIlliI1 instanceof iiiIIIll || IiIlliI1 instanceof i1I1IiII) throw IiIlliI1;
      this.log("readLongCache:", IiIlliI1.message);
    }
  }
  async ["hitCache"](i11i1ili = this.activityId, Iilil1ii = this.pin, liIilili = "hit cache", l1l1iI1i = false) {
    try {
      if (IlIIlIli.redis) {
        if (await IlIIlIli.redis.sismember(i11i1ili, Iilil1ii)) return l1l1iI1i ? this.log(liIilili) : this.putMsg(liIilili), this.exit();
        return;
      }
      if (IlIIlIli.activity["longCache_" + i11i1ili]) {
        if (IlIIlIli?.["activity"]?.["longCache_" + i11i1ili]?.["includes"](Iilil1ii)) return l1l1iI1i ? this.log(liIilili) : this.putMsg(liIilili), this.exit();
        return;
      }
      let IlliIi1 = this.readFileSync("cache/" + Iii1iI1i.envInfo.runName + "/" + i11i1ili).split("\n").filter(iiIIil1I => iiIIil1I && iiIIil1I.trim());
      IlIIlIli.activity["longCache_" + i11i1ili] = IlliIi1;
      if (IlIIlIli?.["activity"]?.["longCache_" + i11i1ili]?.["includes"](Iilil1ii)) return l1l1iI1i ? this.log(liIilili) : this.putMsg(liIilili), this.exit();
    } catch (iiliiiI1) {
      if (iiliiiI1 instanceof iiiIIIll || iiliiiI1 instanceof i1I1IiII) throw iiliiiI1;
      this.log("hitCache:", iiliiiI1.message);
    }
  }
  async ["hitDayCache"](iiI111i = this.activityId, lIIl1l1l = this.pin, i11IIIlI = "hit cache", I1IIIlil = false, I1IIIi11 = true) {
    try {
      if (IlIIlIli.redis) {
        if (await IlIIlIli.redis.sismember(iiI111i, lIIl1l1l)) return I1IIIlil ? this.log(i11IIIlI) : this.putMsg(i11IIIlI), I1IIIi11 && this.exit(), true;
        return false;
      }
      if (IlIIlIli.activity["dayCache_" + iiI111i + "_" + this.formatDate(this.timestamp())]) {
        if (IlIIlIli?.["activity"]?.["dayCache_" + iiI111i + "_" + this.formatDate(this.timestamp())]?.["includes"](lIIl1l1l)) return I1IIIlil ? this.log(i11IIIlI) : this.putMsg(i11IIIlI), I1IIIi11 && this.exit(), true;
        return false;
      }
      let Il1i1111 = this.readFileSync("cache/" + Iii1iI1i.envInfo.runName + "/" + iiI111i + "_" + this.formatDate(this.timestamp())).split("\n").filter(liiIIill => liiIIill && liiIIill.trim());
      IlIIlIli.activity["dayCache_" + iiI111i + "_" + this.formatDate(this.timestamp())] = Il1i1111;
      if (IlIIlIli?.["activity"]?.["dayCache_" + iiI111i + "_" + this.formatDate(this.timestamp())]?.["includes"](lIIl1l1l)) {
        return I1IIIlil ? this.log(i11IIIlI) : this.putMsg(i11IIIlI), I1IIIi11 && this.exit(), true;
      }
      return false;
    } catch (iIl1Ii1I) {
      if (iIl1Ii1I instanceof iiiIIIll || iIl1Ii1I instanceof i1I1IiII) throw iIl1Ii1I;
      this.log("hitCache:", iIl1Ii1I.message);
    }
  }
  async ["writeLongCacheByStop"]() {
    try {
      if (IlIIlIli.redis) return this.activityId && (await IlIIlIli.redis.sadd("activity_stop", this.activityId));
      this.appendFileSync("cache/stop", "id", this.activityId + "\n");
    } catch (l111Iili) {
      if (l111Iili instanceof iiiIIIll || l111Iili instanceof i1I1IiII) throw l111Iili;
      this.log("writeLongCacheByStop:", l111Iili.message);
    }
  }
  ["readLongCacheByStop"]() {
    let lIli11i = this.readFileSync("cache/stop/id").split("\n").filter(ilIii1lI => ilIii1lI && ilIii1lI.trim());
    IlIIlIli.activity.stopIds = lIli11i;
  }
  ["md5"](lliIIii1) {
    const ilIiI1l1 = II11il11.MD5(lliIIii1);
    return ilIiI1l1.toString(II11il11.enc.Hex);
  }
  ["hmacSHA256"](i1l111i, l1Ii1i11) {
    const llI1li1 = II11il11.HmacSHA256(l1Ii1i11, i1l111i);
    return llI1li1.toString(II11il11.enc.Hex);
  }
  ["hmacMD5"](II1lii1l, lIlIiIIi) {
    const I11IliIi = II11il11.HmacMD5(lIlIiIIi, II1lii1l);
    return I11IliIi.toString(II11il11.enc.Hex);
  }
  ["rsaEncrypt"](I111lilI, llI1lIlI, lI11I1l1) {
    I111lilI = "-----BEGIN PUBLIC KEY-----\n" + I111lilI + "\n-----END PUBLIC KEY-----";
    const I11ili = new i111lii1(I111lilI);
    I11ili.setOptions(llI1lIlI);
    const ii11I1I = I11ili.encrypt(lI11I1l1, "base64");
    return ii11I1I;
  }
  ["encryptCrypto"](liIIIi, lIiIl1lI, i1lIliI1, iiiillli, llI1iI1, i111liII, l111i1i1 = false) {
    return II11il11[liIIIi].encrypt(II11il11.enc.Utf8.parse(llI1iI1), II11il11.enc.Utf8.parse(i111liII), {
      "mode": II11il11.mode[lIiIl1lI],
      "padding": II11il11.pad[i1lIliI1],
      "iv": II11il11.enc.Utf8.parse(iiiillli)
    }).ciphertext.toString(l111i1i1 ? II11il11.enc.Hex : II11il11.enc.Base64);
  }
  ["decryptCrypto"](iIl1lI1l, iI1ilil, IiliIl1l, Il111Ii1, IliiIiil, llllll1i, iIi1lilI = false) {
    const lll1iIl = II11il11[iIl1lI1l].decrypt({
      "ciphertext": iIi1lilI ? II11il11.enc.Hex.parse(IliiIiil) : II11il11.enc.Base64.parse(IliiIiil)
    }, II11il11.enc.Utf8.parse(llllll1i), {
      "iv": II11il11.enc.Utf8.parse(Il111Ii1),
      "mode": II11il11.mode[iI1ilil],
      "padding": II11il11.pad[IiliIl1l]
    }).toString(II11il11.enc.Utf8);
    return lll1iIl;
  }
  #base64Encode(iIi1II) {
    const l1Iii1i1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      lliliII = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      Ilili1Il = II11il11.enc.Utf8.parse(iIi1II),
      III1IIl1 = II11il11.enc.Base64.stringify(Ilili1Il),
      IIiiii1i = III1IIl1.split("").map(llllli1l => {
        const illi1llI = l1Iii1i1.indexOf(llllli1l);
        return illi1llI !== -1 ? lliliII[illi1llI] : llllli1l;
      }).join("");
    return IIiiii1i;
  }
  ["generateStringArray"](lIl1ilIi, lllIIIIl) {
    const Ii11ll1l = Array(lIl1ilIi).fill(lllIIIIl),
      IIl1l1ii = Ii11ll1l.join("");
    return IIl1l1ii;
  }
  ["uuid"](Illl = 40) {
    return i1l1ilIl(this.generateStringArray(Illl, "x"));
  }
  ["userAgent"]() {
    const {
        screen: iillli1I,
        tf: iii1I1i,
        iv: Ili1i1l1,
        clientVersion: lIi1lil,
        build: lillIIIi,
        uuid: IiIi1i1i
      } = this.phoneInfo,
      lIIil1l = {
        "ciphertype": 5,
        "cipher": {
          "ud": this.#base64Encode(IiIi1i1i),
          "sv": this.#base64Encode(iii1I1i),
          "iad": ""
        },
        "ts": Date.now(),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
      };
    return {
      "jd4": "JD4iPhone/" + lillIIIi + "%20(iPhone;%20iOS;%20Scale/3.00);jdmall;iphone;version/" + lIi1lil + ";build/" + lillIIIi + ";network/wifi;screen/" + iillli1I.replace("*", "x") + ";os/" + Ili1i1l1,
      "app": "jdapp;iPhone;" + lIi1lil + ";;;M/5.0;appBuild/" + lillIIIi + ";jdSupportDarkMode/1;ef/1;ep/" + encodeURIComponent(JSON.stringify(lIIil1l)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + Ili1i1l1.replaceAll(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"
    };
  }
  ["jdJE"]() {
    const {
        build: l1iIiiil
      } = this.phoneInfo,
      lli1IIi1 = {
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
      l111IIIi = {
        "ciphertype": 5,
        "cipher": {
          "User-Agent": "JD4iPhone/" + l1iIiiil + "%20(iPhone;%20iOS;%20Scale/3.00)"
        },
        "ts": parseInt(this.timestamp() / 1000),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
      };
    return {
      "j-e-c": encodeURIComponent(JSON.stringify(lli1IIi1)),
      "j-e-h": encodeURIComponent(JSON.stringify(l111IIIi))
    };
  }
  ["userPin"](l1liI1i = this.cookie) {
    if (!l1liI1i) {
      return;
    }
    const Iiil1i = l1liI1i.split(";");
    for (const Il1lii1l of Iiil1i) {
      const [il1il11i, iiIIl1] = Il1lii1l.split("=");
      if (il1il11i === "pt_pin") return iiIIl1;
    }
    return null;
  }
  ["getLastSegmentOfUrl"](iIl1iI1) {
    try {
      if (!iIl1iI1) return null;
      const IlliiiIl = new URL(iIl1iI1),
        IiliII1l = IlliiiIl.pathname,
        Ili1l1I1 = IiliII1l.substring(IiliII1l.lastIndexOf("/") + 1);
      return Ili1l1I1;
    } catch (llIilil1) {
      return null;
    }
  }
  ["getCookieByName"](l1iiIi) {
    return this.savedCookies[l1iiIi];
  }
  ["handleSetCookieHeaders"](il111IIi) {
    let iIllIiII = {};
    const IIiiIil = il111IIi["set-cookie"];
    if (IIiiIil) {
      IIiiIil.forEach(i1lilIii => {
        const li1111ll = i1lilIii.match(/([^=]+)(?:=([^;]*))?/);
        if (li1111ll) {
          const II1iIIii = li1111ll[1].trim(),
            l11I11i = li1111ll[2] ? li1111ll[2].trim() : "";
          iIllIiII[II1iIIii] = l11I11i;
        }
      });
    }
    this.savedCookies = {
      ...this.savedCookies,
      ...iIllIiII
    };
    this.ticket = "";
    Object.entries(this.savedCookies).forEach(([II1I1lII, liII1111]) => {
      this.ticket += II1I1lII + "=" + liII1111 + ";";
    });
  }
  #handleHeaders(lIIIi1II) {
    if (this.mode === "hdb") {
      if (!lIIIi1II._s) return;
      let IiII1l1i = {
        "nonce": lIIIi1II._nonce ?? "",
        "s": lIIIi1II._s ?? "",
        "ts": lIIIi1II._ts ?? ""
      };
      this.otherHeaders = {
        ...this.otherHeaders,
        ...IiII1l1i
      };
    }
  }
  ["request"](l1III11) {
    const l11il1i1 = {
        "method": "get",
        "timeout": 20000
      },
      Ill1i = Object.assign({}, l11il1i1, l1III11);
    return new Promise((Illll1l1, il1llIII) => {
      I1II1lIl(Ill1i).then(lIIl11Ii => {
        const Iii1lI1 = lIIl11Ii.data,
          I1iIIill = lIIl11Ii.headers;
        Illll1l1({
          "data": Iii1lI1,
          "headers": I1iIIill
        });
      }).catch(iiiIllll => {
        il1llIII(iiiIllll);
      });
    });
  }
  async #checkProxy(l1ii1l1i) {
    try {
      return await I1II1lIl({
        "url": this.activityUrl || "https://www.jd.com",
        "headers": {
          "User-Agent": this.ua.app
        },
        "httpsAgent": l1ii1l1i,
        "timeout": 4000
      }), true;
    } catch (IllililI) {
      return false;
    }
  }
  async #getProxyIp(l1IIllII = 10) {
    if (!Iii1iI1i.proxy.proxyState) return null;
    if (iIl1IlI1.wxProxyMode === 1) {
      if (IlIIlIli.proxyIp && IlIIlIli.proxyIpTime + iIl1IlI1.wxProxyInterval * 1000 > this.timestamp()) return IlIIlIli.proxyIp;
      let lll1lI11 = await Iii1iI1i.proxy.getCurrentProxy();
      if (!lll1lI11) return null;
      return IlIIlIli.proxyIp = lll1lI11, IlIIlIli.proxyIpTime = this.timestamp(), lll1lI11;
    } else {
      if (iIl1IlI1.wxProxyMode === 2) {
        if (this.proxyIp && this.proxyIpTime + iIl1IlI1.wxProxyInterval * 1000 > this.timestamp()) {
          return this.proxyIp;
        }
        let i11I1ll1 = await Iii1iI1i.proxy.getCurrentProxy();
        if (!i11I1ll1) return null;
        return this.log("获取到的ip:" + i11I1ll1), this.proxyIp = i11I1ll1, this.proxyIpTime = this.timestamp(), i11I1ll1;
      } else this.log("代理模式错误");
    }
    return null;
  }
  async #handleRequestParams(i1il1iI) {
    const IIilIII = {
      ...this.headers
    };
    !i1il1iI?.["noReferer"] && this.activityUrl && (IIilIII.Referer = this.activityUrl);
    const iliIi1l1 = {
      "url": "https://api.m.jd.com/",
      "method": "get",
      "headers": {
        ...IIilIII,
        ...i1il1iI?.["headers"],
        ...this.otherHeaders
      },
      "timeout": iIl1IlI1.timeoutDuration * 1000
    };
    delete i1il1iI.headers;
    i1il1iI = Object.assign({}, iliIi1l1, i1il1iI);
    this.haskey(i1il1iI, "api") && (i1il1iI.url += i1il1iI.api);
    if (this.haskey(i1il1iI, "json")) i1il1iI.data = i1il1iI.json, i1il1iI.headers = {
      ...i1il1iI.headers,
      "Content-Type": "application/json;charset=UTF-8"
    }, i1il1iI.method = "post";else {
      if (this.haskey(i1il1iI, "data")) {
        i1il1iI.headers = {
          ...i1il1iI.headers,
          "Content-Type": "application/x-www-form-urlencoded"
        };
        i1il1iI.method = "post";
      }
    }
    const ii1il1li = i1il1iI?.["functionId"] || "",
      llilli1l = i1il1iI?.["body"] || "";
    if (this.haskey(i1il1iI, "sign")) {
      let Iliilili = i1l1iil.getSignData(ii1il1li, llilli1l, this.phoneInfo);
      i1il1iI.method == "get" ? i1il1iI.params = Object.assign({}, i1il1iI.params, Iliilili) : i1il1iI.data = Object.assign({}, i1il1iI.data, Iliilili);
    }
    let l1liI1 = false,
      lI1ill1l;
    if (this.haskey(i1il1iI, "h5st31")) l1liI1 = true, lI1ill1l = "3.1";else {
      if (this.haskey(i1il1iI, "h5st41")) l1liI1 = true, lI1ill1l = "4.1";else {
        if (this.haskey(i1il1iI, "h5st42")) l1liI1 = true, lI1ill1l = "4.2";else {
          if (this.haskey(i1il1iI, "h5st43")) l1liI1 = true, lI1ill1l = "4.3";else this.haskey(i1il1iI, "h5st44") && (l1liI1 = true, lI1ill1l = "4.4");
        }
      }
    }
    if (l1liI1) {
      let ii1I1il1 = await this.h5st.encrypt(i1il1iI.appId, i1il1iI.functionId, i1il1iI.body, i1il1iI.appid, i1il1iI.client, i1il1iI.clientVersion, i1il1iI.t, lI1ill1l);
      i1il1iI.method == "get" ? i1il1iI.params = Object.assign({}, i1il1iI.params, ii1I1il1) : i1il1iI.data = Object.assign({}, i1il1iI.data, ii1I1il1);
    }
    i1il1iI = this.#checkAndEncryptParameters(i1il1iI);
    i1il1iI?.["headers"]["Content-Type"] === "application/x-www-form-urlencoded" && (i1il1iI.data = iIl1llII.stringify(i1il1iI.data));
    if (i1il1iI?.["jdje"]) {
      i1il1iI.headers = {
        ...i1il1iI.headers,
        ...this.jdJE(),
        "x-referer-package": "com.360buy.jdmobile",
        "x-rp-client": "ios_4.0.0"
      };
    }
    i1il1iI?.["headers"]?.["Referer"] && (i1il1iI.headers.Referer = this.encodeChineseParams(i1il1iI.headers.Referer));
    let I1lliII = {
      "url": i1il1iI.url,
      "method": i1il1iI.method,
      "params": i1il1iI?.["params"] || {},
      "data": i1il1iI?.["data"] || {},
      "headers": i1il1iI?.["headers"] || {},
      "timeout": i1il1iI?.["timeout"] || 30000,
      "maxRedirects": i1il1iI?.["maxRedirects"] || 5
    };
    if (!i1il1iI?.["noUseProxy"]) {
      const liI1iI1l = I1lliII.url.includes("https://") && I1lliII.url.includes("api.m.jd.com") ? iI111l1i.jdAppTlsOptions : {},
        l1liiII = await this.#getProxyIp();
      I1lliII.httpsAgent = II1li1II({
        "proxy": l1liiII ? "http://" + l1liiII : null,
        "tlsOptions": liI1iI1l
      });
    }
    return I1lliII;
  }
  #tlsOptions(lllllIll, Ilii1l1 = false) {
    !Ilii1l1 && lllllIll?.["url"]["includes"]("https") && lllllIll?.["url"]?.["includes"]("api.m.jd.com") && (l1liiii1.globalAgent = new l1liiii1.Agent(tlsOptions));
    Ilii1l1 && l1liiii1.globalAgent.options && Object.keys(tlsOptions).forEach(l1ii11i1 => delete l1liiii1.globalAgent.options[l1ii11i1]);
  }
  #checkAndEncryptParameters(liIiI1l) {
    if (this.defenseUrls.some(lIIIii1i => liIiI1l.url.includes(lIIIii1i))) {
      if (this.mode === "wx") {
        liIiI1l.data = {
          "ecyText": i11IIIli({
            ...liIiI1l.data,
            "actId": this.activityId
          }, this.getCookieByName("pToken"), this.getCookieByName("te"))
        };
        liIiI1l.headers["Content-Type"] = "application/json;charset=UTF-8";
      } else {
        if (this.mode === "100") {
          liIiI1l.data.actId = this.activityId;
          liIiI1l.data = {
            "ecyText": i11IIIli(liIiI1l.data, this.getCookieByName("pToken"), this.getCookieByName("te"))
          };
        }
      }
    }
    if (this.mode == "hdb" && liIiI1l.method === "post" && iI111l1i.hdbTypes.some(iliiiI1I => liIiI1l.url.includes(iliiiI1I))) {
      liIiI1l.data.sysParams = {
        "sysmethod": liIiI1l.data.appJsonParams.method,
        "sign": "111111",
        "timestamp": 123456
      };
    }
    return liIiI1l;
  }
  async #proxyRequiredCheck(iliIi1ll, llliIIl) {
    if (iIl1IlI1.wxProxyEnable === 2 && iIl1IlI1.wxProxyUrl && iliIi1ll.match(iIl1IlI1.proxyRegx)) {
      if (iIl1IlI1.wxProxyMode === 1 && IlIIlIli.proxyIp && IlIIlIli.proxyIpTime && llliIIl && llliIIl < IlIIlIli.proxyIpTime) return true;
      return iIl1IlI1.wxProxySmart === 1 && Iii1iI1i.proxy.updateProxyEnable(true), this.proxyIp = null, IlIIlIli.proxyIp = null, Iii1iI1i.proxy.cleanProxy(), true;
    }
    return false;
  }
  #handleMatchingResponse(iiI1IliI) {
    if (iiI1IliI && iiI1IliI.constructor === Object) {
      iiI1IliI = JSON.stringify(iiI1IliI);
      iiI1IliI.includes("AUTH.FAILED.BLACK") && (this.black = true, this.putMsg("AUTH BLACK"), this.reseCookieStatus(), this.exit());
      if (iiI1IliI.match(iIl1IlI1.reTryRegx) && !iiI1IliI.includes("AUTH.FAILED.BLACK")) {
        return true;
      }
    }
    return false;
  }
  #retryOnEmptyStringResponse(iiIiii11, i1i111lI) {
    if (!i1i111lI && this.defenseUrls.some(liI11111 => iiIiii11.url.includes(liI11111))) return true;
    return false;
  }
  async ["jd_api"](ii1i111i, il1il11l = true, ili1i1I1 = 0, IIi1iIl = 0) {
    let lIliill = Object.assign({}, ii1i111i),
      II1liI1l = ii1i111i?.["functionId"],
      iilIIIIl = await this.#handleRequestParams(ii1i111i),
      i1li1l1I = this.timestamp();
    try {
      let {
        data: iIllii1i,
        headers: iI1i1l1
      } = await this.request(iilIIIIl);
      il1il11l && this.handleSetCookieHeaders(iI1i1l1);
      this.#handleHeaders(iI1i1l1);
      if (ili1i1I1 < this.retryCount && this.#retryOnEmptyStringResponse(iilIIIIl, iIllii1i)) {
        return this.log("空数据重试" + ili1i1I1), await this.initPinToken(), await this.jd_api(lIliill, true, ili1i1I1 + 1, IIi1iIl);
      }
      if (ili1i1I1 < this.retryCount && this.#handleMatchingResponse(iIllii1i)) return this.debug(iIllii1i), this.log("重试" + ili1i1I1), await this.jd_api(lIliill, true, ili1i1I1 + 1, IIi1iIl);
      let ll1ilIli = this.json2Str(iIllii1i);
      if (ili1i1I1 < this.retryCount && iIllii1i && ll1ilIli && /您点的太快了|操作过于频繁/.test(ll1ilIli)) return this.debug(iIllii1i), this.log("等待重试" + ili1i1I1), await this.sleep(1500), await this.jd_api(lIliill, true, ili1i1I1 + 1, IIi1iIl);
      return iIllii1i;
    } catch (lii1Illl) {
      if (lii1Illl instanceof i1I1IiII || lii1Illl instanceof iiiIIIll) throw lii1Illl;
      const i1iiiIl1 = lii1Illl?.["response"]?.["status"],
        iIII111l = [301, 302];
      if (this.retryStatusRegex?.["test"](i1iiiIl1) && ili1i1I1 < this.retryCount) return await this.jd_api(lIliill, true, ili1i1I1 + 1, IIi1iIl);
      if ([404, ...iIII111l].includes(i1iiiIl1) && ii1i111i?.["url"]?.["includes"]("getDefenseUrls")) return [];
      if (ii1i111i?.["maxRedirects"] === 0 && il1il11l && iIII111l.includes(i1iiiIl1)) return this.handleSetCookieHeaders(lii1Illl?.["response"]?.["headers"]), lii1Illl?.["response"]?.["headers"];
      if (this.blackRegx?.["test"](i1iiiIl1)) return this.putMsg(lii1Illl.response?.["data"]?.["message"] || "黑号"), this.exit();
      this.debug(lii1Illl.response?.["data"]);
      const I1IIll1i = lii1Illl.message;
      if (lii1Illl?.["response"]?.["status"] === 500 && this.defenseUrls.some(IiI1l1ii => iilIIIIl.url.includes(IiI1l1ii)) && ili1i1I1 < this.retryCount) {
        return await this.initPinToken(), this.log("500重试" + ili1i1I1), await this.jd_api(lIliill, true, ili1i1I1 + 1, IIi1iIl);
      }
      const IlIi1Ii = II1liI1l?.["includes"]("isvObfuscator");
      if (IlIi1Ii && IIi1iIl > iIl1IlI1.isvObfuscatorRetry) return undefined;
      if (IIi1iIl < this.proxyRetryCount && (await this.#proxyRequiredCheck(I1IIll1i, i1li1l1I))) return iIl1IlI1.showProxyRetryLog && this.log("" + (IlIi1Ii ? "isvObfuscator " : "") + (lii1Illl?.["response"]?.["status"] ?? "") + "代理重试" + IIi1iIl), IlIi1Ii && (await this.sleep(iIl1IlI1.isvObfuscatorRetryWait * 1000)), await this.jd_api(lIliill, true, ili1i1I1, IIi1iIl + 1);
      return this.error("[" + (II1liI1l ?? lIliill?.["params"]?.["functionId"] ?? lIliill?.["data"]?.["functionId"] ?? lIliill?.["json"]?.["functionId"] ?? this.getLastSegmentOfUrl(ii1i111i?.["url"])) + "]请求失败," + (i1iiiIl1 ? "状态码[" + i1iiiIl1 + "]" : I1IIll1i)), undefined;
    }
  }
  async ["taskGet"](li1l, lIIil11I = {}) {
    let i1iiliil = li1l.startsWith("http") ? li1l : "https://" + this.domain + (this.prefix ? ("/" + this.prefix).replace(/\/\//g, "/") : "") + ("/" + li1l).replace(/\/\//g, "/"),
      iiIiiIl = {
        "url": i1iiliil,
        "method": "get",
        "params": lIIil11I,
        "headers": {
          "Referer": this.activityUrl,
          "Cookie": this.isvToken ? "IsvToken=" + this.isvToken + ";" + this.ticket : this.cookie
        }
      };
    return await this.jd_api(iiIiiIl);
  }
  async ["taskPost"](l1ll1I1I, IliiIi1i = {}, iIiIIlli = {}, iIIlIIi = false) {
    let lIiIiIIl = this.prefix ? (this.domain + "/" + this.prefix + "/" + l1ll1I1I).replace(/\/\//g, "/") : (this.domain + "/" + l1ll1I1I).replace(/\/\//g, "/"),
      I1III1l1 = "https://" + lIiIiIIl,
      IlIili = {
        "url": I1III1l1,
        "method": "post",
        "headers": {
          "Referer": this.activityUrl,
          "Cookie": this.isvToken ? "IsvToken=" + this.isvToken + ";" + this.ticket : this.cookie,
          ...iIiIIlli
        }
      };
    return iIIlIIi ? IlIili.json = IliiIi1i : IlIili.data = IliiIi1i, await this.jd_api(IlIili);
  }
  async ["taskPostByJson"](i1IIlii1, Il111ll1 = {}, ll1ii1il = {}) {
    return await this.taskPost(i1IIlii1, Il111ll1, ll1ii1il, true);
  }
  ["wxStop"](Iil11l) {
    if (!Iil11l) return;
    for (let Il11II1l of iIl1IlI1.stopKeywords) {
      if (Iil11l.includes(Il11II1l)) {
        throw new i1I1IiII("退出");
      }
    }
  }
  async ["wxStopSync"](I1iIli1I) {
    if (!I1iIli1I) return;
    if (/已结束/.exec(I1iIli1I)) {
      await this.writeLongCacheByStop();
    }
    for (let llii1 of iIl1IlI1.stopKeywords) {
      if (I1iIli1I.includes(llii1)) throw new i1I1IiII("退出");
    }
  }
  async ["wxCommonInfo"](liI11Iil = true, IIIiiIil = 3) {
    let IlI1ilii = await this.taskGet(this.activityUrl);
    if (IlI1ilii && IlI1ilii.includes("活动已经结束") && liI11Iil) {
      this.putMsg("活动已经结束,手动确认");
      this.stop();
      return;
    }
    (this.domain.includes("lzkj") || this.domain.includes("lzdz1")) && (await this.taskGet("/wxCommonInfo/token"));
    if (!this.ticket.includes("LZ_TOKEN_KEY")) {
      this.debug(this.ticket);
      IIIiiIil <= 0 && (this.putMsg("初始化LZ_TOKEN_KEY失败"), this.exit());
      this.log("初始化LZ_TOKEN_KEY失败,正在重试...");
      this.ticket = "";
      return await this.wxCommonInfo(liI11Iil, IIIiiIil - 1);
    }
  }
  ["addressInit"]() {
    for (let i1l11lli of IlIIlIli.addressList) {
      if (i1l11lli.pt_pin === this.pin) {
        this.address = i1l11lli.address;
        this.remarks = i1l11lli.remarks;
        this.tg_id = i1l11lli.tg_id;
        return;
      }
    }
  }
  ["getAddress"]() {
    if (this.address) return;
    if (IlIIlIli.addressList.length === 0) {
      this.address = "";
      return;
    }
    if (iIl1IlI1.saveAddressMode === 2) {
      const lIIil1i1 = IlIIlIli.addressList.find(iiIiii1I => !iiIiii1I.use);
      lIIil1i1 ? (this.address = lIIil1i1.address, lIIil1i1.use = true) : (IlIIlIli.addressList.forEach(iiIllIlI => iiIllIlI.use = false), this.address = IlIIlIli.addressList[0].address, IlIIlIli.addressList[0].use = true);
      return;
    }
    const i1II1II1 = li1iI1I => li1iI1I.pt_pin.includes("默认地址"),
      ill11iIl = IiI111ii => !IiI111ii.useNum || IiI111ii.useNum < iIl1IlI1.addressUseNum || iIl1IlI1.addressUseNum === 0,
      iIIlilII = IlIIlIli.addressList.filter(iii11ii1 => i1II1II1(iii11ii1) && ill11iIl(iii11ii1)),
      i1liIi1I = IlIIlIli.addressList.filter(III1l1Ii => !i1II1II1(III1l1Ii) && ill11iIl(III1l1Ii));
    if (iIIlilII.length > 0) {
      const Illi11II = Math.floor(Math.random() * iIIlilII.length),
        i1i1i1l1 = iIIlilII[Illi11II];
      this.address = i1i1i1l1.address;
      i1i1i1l1.useNum ? i1i1i1l1.useNum += 1 : i1i1i1l1.useNum = 1;
    } else {
      if (i1liIi1I.length > 0) {
        const IiiIili = Math.floor(Math.random() * i1liIi1I.length),
          lili1llI = i1liIi1I[IiiIili];
        this.address = lili1llI.address;
        lili1llI.useNum ? lili1llI.useNum += 1 : lili1llI.useNum = 1;
      }
    }
  }
  async ["getShopOpenCardInfo"](iI1lIl11 = this.venderId || this.shopId) {
    let l1iIlilI = {
        "venderId": iI1lIl11,
        "payUpShop": true,
        "queryVersion": "10.5.2",
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com",
        "channel": "8018006"
      },
      IIlii1l = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "body": l1iIlilI,
        "data": {
          "functionId": "getShopOpenCardInfo",
          "body": l1iIlilI,
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
    if (IIlii1l && IIlii1l.success) {
      let Illl1iI1 = IIlii1l?.["result"][0],
        IliI1Iii = Illl1iI1?.["interestsRuleList"] ?? [];
      this.openCardStatus = Illl1iI1?.["userInfo"]?.["openCardStatus"] ?? 0;
      this.giftList = IliI1Iii;
      if (IliI1Iii.length > 0) this.giftActId = IliI1Iii?.[0]?.["interestsInfo"]["activityId"] ?? "";else {
        this.giftActId = "";
      }
    } else this.giftActId = "";
    return IIlii1l;
  }
  async ["bindWithVender"](Ili1il1i = this.venderId || this.shopId) {
    let IIliliI = {
        "venderId": Ili1il1i,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": "8018006",
        "activityId": this.giftActId,
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com"
      },
      llilI1II = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "body": IIliliI,
        "data": {
          "functionId": "bindWithVender",
          "appid": "shopmember_m_jd_com",
          "body": IIliliI,
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
    this.debug(llilI1II);
    if (llilI1II && llilI1II.code === 0) {
      if (llilI1II.busiCode === "0") {
        if (llilI1II.result?.["giftInfo"]?.["giftList"]) {
          let iIlI1ill = llilI1II.result.giftInfo.giftList.map(il1lii11 => "" + il1lii11.discountString + il1lii11.prizeName).join(",");
          this.log("加入店铺[" + Ili1il1i + "]会员成功,获得" + iIlI1ill);
        } else this.log("加入店铺[" + Ili1il1i + "]会员成功");
      } else {
        this.log(llilI1II?.["message"]);
        if (llilI1II?.["message"]?.["includes"]("已经是本店会员")) {} else this.canNotOpenCard = true;
      }
    } else this.log("加入店铺[" + Ili1il1i + "]会员失败", llilI1II?.["message"]), this.canNotOpenCard = true;
    return llilI1II;
  }
  async ["isvObfuscator"]() {
    if (IlIIlIli.redis) {
      let iIilIIi = await IlIIlIli.redis.get("" + this.pin);
      if (iIilIIi) {
        return this.isvToken = iIilIIi, {
          "code": "0",
          "token": this.isvToken
        };
      }
    } else {
      let iI1lI11i = this.readFileSync("./tokens/" + this.pin),
        iIi1Ilil = iI1lI11i ? JSON.parse(iI1lI11i) : {};
      if (iIi1Ilil && iIi1Ilil?.["expireTime"] > this.timestamp() - this.random(0, 2 * 60 * 1000) && iIi1Ilil?.["token"]) {
        return this.isvToken = iIi1Ilil.token, {
          "code": "0",
          "token": this.isvToken
        };
      }
    }
    const ii11lll1 = {
        "url": "https://" + this.domain,
        "id": ""
      },
      IiiillI = await this.jd_api({
        "url": "https://api.m.jd.com/client.action",
        "method": "post",
        "functionId": "isvObfuscator",
        "body": ii11lll1,
        "data": {},
        "headers": {
          ...this.headers,
          "User-Agent": this.ua.jd4
        },
        "sign": true,
        "noReferer": true,
        "jdje": true
      }, false);
    if (IiiillI && IiiillI?.["code"] === "0" && IiiillI?.["token"]) {
      let illIi111 = IiiillI.token;
      this.isvToken = illIi111;
      IlIIlIli.redis ? await IlIIlIli.redis.set("" + this.pin, illIi111, this.random(25, 28) * 60) : this.writeFileSync("tokens", this.pin, JSON.stringify({
        "expireTime": this.timestamp() + this.random(20, 26) * 60 * 1000,
        "token": illIi111
      }));
    } else IiiillI?.["code"] === "3" && IiiillI?.["errcode"] === 264 ? (this.putMsg("ck过期"), this.reseCookieStatus(), this.exit()) : this.log(IiiillI);
    if (!this.isvToken) {
      this.putMsg("获取Token失败");
      this.reseCookieStatus();
      this.exit();
    }
    return IiiillI;
  }
  async ["getShopInfo"](lIIIi11i = this.venderId, Iilili11 = this.shopId) {
    if (IlIIlIli.activity.shopName) {
      this.shopName = IlIIlIli.activity.shopName;
      this.venderId = IlIIlIli.activity.venderId;
      this.shopId = IlIIlIli.activity.shopId;
      return;
    }
    let IiliIlll = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "getShopHomeBaseInfo",
      "body": {
        "shopId": Iilili11?.["toString"](),
        "source": "app-shop",
        "sourceRpc": "shop_app_home_home",
        "venderId": lIIIi11i?.["toString"]()
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
    return IiliIlll && IiliIlll.code === "0" && IiliIlll.isSuccess && (this.shopName = IiliIlll.result.shopInfo.shopName, this.venderId = IiliIlll.result.shopInfo.venderId, this.shopId = IiliIlll.result.shopInfo.shopId, IlIIlIli.activity = Object.assign(IlIIlIli.activity, {
      "shopName": this.shopName,
      "shopId": this.shopId,
      "venderId": this.venderId
    })), IiliIlll;
  }
  async ["follow"](lliIilll = this.shopId) {
    let ilIi1i1 = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "followShop",
      "body": {
        "member": "true",
        "follow": "true",
        "shopId": lliIilll.toString(),
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
    this.debug(ilIi1i1);
    if (ilIi1i1 && ilIi1i1.code === "0") return this.log(ilIi1i1.msg || "关注成功"), true;
    return this.log(ilIi1i1), false;
  }
  async ["unfollow"](lil1IIII = this.shopId || this.venderId) {
    let ll1lilli = await this.jd_api({
      "api": "client.action",
      "method": "post",
      "data": {},
      "functionId": "followShop",
      "body": {
        "follow": "false",
        "shopId": lil1IIII.toString(),
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
    if (ll1lilli && ll1lilli.code === "0") {
      return this.log(ll1lilli.msg || "取消关注成功"), true;
    }
    return this.log(ll1lilli), false;
  }
  async ["wxApi"](illI1lII, IIIIiI = {}) {
    return await this.taskPost(illI1lII, {
      "activityId": this.activityId,
      ...IIIIiI
    });
  }
  async ["getSimpleActInfoVo"](i1Il1II1 = "customer/getSimpleActInfoVo") {
    if (IlIIlIli.activity.activityType) {
      this.type = IlIIlIli.activity.type;
      this.venderId = IlIIlIli.activity?.["venderId"];
      this.shopId = IlIIlIli.activity?.["shopId"];
      this.activityType = IlIIlIli.activity?.["activityType"];
      return;
    }
    let ii1lilii = await this.wxApi(i1Il1II1);
    if (ii1lilii && ii1lilii?.["result"] && ii1lilii?.["data"]) {
      IlIIlIli.activity = Object.assign(IlIIlIli.activity, ii1lilii?.["data"]);
      this.venderId = ii1lilii?.["data"]?.["venderId"];
      this.shopId = ii1lilii?.["data"]?.["shopId"];
      this.activityType = ii1lilii?.["data"]?.["activityType"];
      const iII11IIl = {
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
      if (iII11IIl[this.activityType]) this.type = iII11IIl[this.activityType];else {
        this.type = "wxDrawActivity";
      }
      IlIIlIli.activity.type = this.type;
    } else {
      this.putMsg("手动确认,活动不存在或者已结束");
      this.stop();
    }
    return ii1lilii;
  }
  async ["activityContent"](lIi1llIl = {}, lii11ll1 = "") {
    let I1l1Iill = await this.wxApi(this.type + "/activityContent", {
      "activityId": this.activityId,
      "pin": this.secretPin,
      ...lIi1llIl
    });
    if (I1l1Iill && I1l1Iill?.["data"]) {
      let ll11iiII = lii11ll1 ? I1l1Iill.data[lii11ll1] : I1l1Iill.data,
        il1IIi1i = ll11iiII?.["startTime"],
        I11ili1i = ll11iiII?.["endTime"];
      const iiilIiiI = ll11iiII?.["rule"] || ll11iiII?.["actRule"] || "";
      try {
        if (!il1IIi1i || !I11ili1i) {
          const IIIlllI = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/g,
            iIIi1Il = iiilIiiI.match(IIIlllI);
          if (iIIi1Il) {
            il1IIi1i = new Date(iIIi1Il[0]).getTime();
            I11ili1i = new Date(iIIi1Il[1]).getTime();
          }
        }
        this.rule = iiilIiiI;
        IlIIlIli.activity.timeStr = this.formatDate(il1IIi1i, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(I11ili1i, "yyyy-MM-dd HH:mm:ss");
        IlIIlIli.activity.startTime = il1IIi1i;
        IlIIlIli.activity.endTime = I11ili1i;
      } catch (l11i1l11) {}
      il1IIi1i && il1IIi1i > Date.now() && (this.putMsg("活动未开始"), IlIIlIli.activity.noStart = true, this.stop());
      I11ili1i && I11ili1i < Date.now() && (this.putMsg("活动已结束"), await this.writeLongCacheByStop(), this.stop());
    }
    return I1l1Iill;
  }
  async ["getGiveContent"]() {
    let Il1liii = await this.wxApi("wxDrawActivity/getGiveContent", {
      "pin": this.secretPin
    });
    if (Il1liii && Il1liii?.["data"]) {}
    return Il1liii;
  }
  async ["initPinToken"](i111l1 = this.venderId, IlI1Ii = this.shopId) {
    let illlli1l = {
        "activityId": this.activityId,
        "jdToken": this.isvToken,
        "source": "01",
        "uuid": this.phoneInfo.uuid,
        "clientTime": Date.now()
      },
      iiiii1Il = "";
    this.mode === "100" ? (illlli1l = {
      ...illlli1l,
      "shareUserId": "",
      "shopId": IlI1Ii,
      "status": 1
    }, iiiii1Il = "https://" + this.domain + this.prefix + "/api/user-info/initPinToken") : (illlli1l = {
      ...illlli1l,
      "venderId": i111l1,
      "fromType": "APP",
      "riskType": 1,
      "client": "iOS",
      "clientVersion": this.phoneInfo.clientVersion,
      "osVersion": this.phoneInfo.iv,
      "model": "iPhone" + this.phoneInfo.tf,
      "userAgent": this.ua.app
    }, iiiii1Il = "https://" + this.domain + "/customer/initPinToken");
    let iiillI1 = await this.taskGet(this.mode === "wx" ? "customer/initPinToken" : "api/user-info/initPinToken", illlli1l);
    if (this.mode === "wx" && iiillI1 && iiillI1.result) this.secretPin = encodeURIComponent(iiillI1.data?.["secretPin"]), this.nickname = iiillI1.data?.["nickname"];else this.mode === "100" && iiillI1 && iiillI1.resp_code === 0 ? this.pinToken = JSON.parse(iiillI1.data)?.["data"]?.["pinToken"] : (this.putMsg(iiillI1?.["errorMessage"] || iiillI1?.["data"] || iiillI1?.["resp_msg"]), this.wxStop(iiillI1?.["errorMessage"] || iiillI1?.["data"] || iiillI1?.["resp_msg"]), this.reseCookieStatus(), this.exit());
    return iiillI1;
  }
  async ["getMyPing"](ill11Ii = "customer/getMyPing", iIllI11I = this.isvToken, lI11IlIi = this.venderId) {
    let lIli1li1 = await this.wxApi(ill11Ii, {
      "userId": lI11IlIi,
      "token": iIllI11I,
      "fromType": "APP"
    });
    if (lIli1li1 && lIli1li1?.["result"]) this.secretPin = lIli1li1.data?.["secretPin"], this.nickname = lIli1li1.data?.["nickname"];else {
      let lllllIIi = lIli1li1?.["errorMessage"] || "获取pin失败";
      this.putMsg(lllllIIi);
      this.wxStop(lllllIIi);
      lllllIIi.includes("请联系商家") && this.stop();
      this.reseCookieStatus();
      this.exit();
    }
    return lIli1li1;
  }
  async ["accessLog"](i1iiI1 = this.secretPin) {
    let I1IlIIIi = this.domain.includes("cjhy") ? "accessLog" : "accessLogWithAD";
    await this.wxApi("common/" + I1IlIIIi, {
      "venderId": this.venderId,
      "code": this.activityType,
      "pin": i1iiI1,
      "activityId": this.activityId,
      "pageUrl": this.activityUrl,
      "subType": "app",
      "uuid": this.phoneInfo.uuid
    });
  }
  async ["saveAddress"](IlIl1ll1 = this.addressId, iI1liIi1 = this.prizeName) {
    IlIIlIli.isSaveAddress = true;
    this.getAddress();
    if (!this.address) {
      this.putMsg("未配置地址或所有地址已达使用上限,退出填地址");
      return;
    }
    if (iIl1IlI1.addressStopKeywords && iIl1IlI1.addressStopKeywords.some(iiIlli1i => {
      return iI1liIi1?.["includes"](iiIlli1i);
    })) {
      this.putMsg("触发关键词不填地址");
      return;
    }
    if (iIl1IlI1.addressStopKeywordsRule && iIl1IlI1.addressStopKeywordsRule.some(II1iliii => {
      return this.rule?.["includes"](II1iliii);
    })) {
      this.putMsg("触发规则不填地址");
      return;
    }
    this.log("使用地址", this.address);
    let liIIl1iI = false;
    if (this.mode == "wx") {
      this.address.generateId = IlIl1ll1;
      let iI1IliIi = await this.wxApi("wxAddress/save", {
        ...this.address,
        "venderId": this.venderId,
        "pin": this.secretPin,
        "activityId": this.activityId,
        "actType": this.activityType,
        "prizeName": iI1liIi1,
        "personalEmail": ""
      });
      this.log(iI1IliIi);
      iI1IliIi && iI1IliIi.result ? (this.putMsg("已填地址"), liIIl1iI = true) : (this.putMsg("填地址失败"), this.putMsg(iI1IliIi.errorMessage));
    } else {
      if (this.mode === "100") {
        const {
          phone: lIll1iiI,
          address: lIII1iIl,
          receiver: l1lll111,
          city: IlI111ll,
          county: liIliIii,
          province: i1I1i1ll
        } = this.address;
        let iI1li1Ii = {
            "mobile": lIll1iiI,
            "address": lIII1iIl,
            "realName": l1lll111,
            "city": IlI111ll,
            "county": liIliIii,
            "orderCode": IlIl1ll1,
            "province": i1I1i1ll
          },
          illll1li = await this.lzkjApi("api/my/prize/update", iI1li1Ii);
        if (illll1li.resp_code === 0) this.putMsg("已填地址"), liIIl1iI = true;else {
          this.putMsg("填地址失败");
          this.putMsg(illll1li.resp_msg);
        }
      } else {
        if (this.mode === "hdb") {
          const {
            phone: ll1lil1,
            address: liiIllil,
            receiver: IiliIlil,
            city: l1llIli1,
            county: i1li1III,
            province: lIil1l1
          } = this.address;
          let l1ii1ilI = {
              "province": lIil1l1,
              "city": l1llIli1,
              "area": i1li1III,
              "detailAddress": liiIllil,
              "address": "" + lIil1l1 + l1llIli1 + i1li1III + liiIllil,
              "mobile": ll1lil1,
              "receiveName": IiliIlil,
              "activityLogId": IlIl1ll1
            },
            iill1lii = await this.hdbApi("postDeliveryInfo", l1ii1ilI);
          this.log(iill1lii);
          if (iill1lii && iill1lii.succ) this.putMsg("已填地址"), liIIl1iI = true;else {
            this.putMsg("填地址失败");
            this.putMsg(iill1lii?.["message"]);
          }
        } else {
          if (this.mode === "hzbz") {
            const {
              phone: ll11iIli,
              address: I111111i,
              receiver: i1i1I1I1,
              city: liIilIi1,
              county: IiIiIiii,
              province: iII1Illi
            } = this.address;
            let ilil1lI1 = {
                "addressRegion": iII1Illi + "-" + liIilIi1 + "-" + IiIiIiii,
                "address": I111111i,
                "mobile": ll11iIli,
                "name": i1i1I1I1,
                "condtionId": ""
              },
              I1111Iil = await this.hzbzApi("SaveUserInfo.json", ilil1lI1);
            this.log(I1111Iil);
            I1111Iil && I1111Iil.code === 0 ? (this.putMsg("已填地址"), liIIl1iI = true) : (this.putMsg("填地址失败"), this.putMsg(I1111Iil?.["txt"]));
          } else {
            if (this.mode === "jinggeng") {
              const {
                phone: l11i1I,
                address: illiI1II,
                receiver: liIll1,
                city: lilIi1i1,
                county: liiillli,
                province: i1ii11l1
              } = this.address;
              let IiIii1ll = await this.jinggengApi("postBuyerInfo", {
                "receiverName": liIll1,
                "mobile": l11i1I,
                "address": i1ii11l1.replace("省", "").replace("市", "") + " " + lilIi1i1.replace("市", "") + " " + liiillli + illiI1II,
                "log_id": IlIl1ll1
              });
              this.log(IiIii1ll);
              IiIii1ll && IiIii1ll.succ ? (this.putMsg("已填地址"), liIIl1iI = true) : (this.putMsg("填地址失败"), this.putMsg(IiIii1ll?.["msg"]));
            } else {
              if (this.mode === "v2") {
                if (!this.activityPrizeId) return this.putMsg("activityPrizeId不存在,退出填地址");
                const {
                  phone: iii1lIlI,
                  address: illIl1II,
                  receiver: IIiliIlI,
                  city: lI1lil1,
                  county: lIl111II,
                  province: l1lillli
                } = this.address;
                let li111lI = await this.v2Api("api/" + this.activityType + "/userAddressInfo", {
                  "addressId": IlIl1ll1,
                  "address": illIl1II,
                  "county": lIl111II,
                  "city": lI1lil1,
                  "province": l1lillli,
                  "mobile": iii1lIlI,
                  "realName": IIiliIlI,
                  "activityPrizeId": this.activityPrizeId
                });
                this.log(li111lI);
                li111lI && li111lI.code === 200 ? (this.putMsg("已填地址"), liIIl1iI = true) : (this.putMsg("填地址失败"), this.putMsg(li111lI?.["message"]));
              }
            }
          }
        }
      }
    }
    if (liIIl1iI) {
      let iI1II1li = this.formatDate(Date.now(), "yyyy-MM-dd HH:mm:ss") + "," + iI1liIi1 + "," + this.pin + "," + this.address?.["phone"] + "," + this.address?.["address"] + "," + Iii1iI1i.envInfo.name + "," + (this.shopId ?? this.venderId) + "," + this.activityUrl + "\n";
      this.appendFileSync("", "gifts.csv", iI1II1li);
    }
    IlIIlIli.isSaveAddress = false;
  }
  async ["getPrize"](iI11Iil = false) {
    let Ill1li1i = await this.wxApi(this.type + "/getPrize", {
      "activityId": this.activityId,
      "pin": this.secretPin
    });
    this.debug(Ill1li1i);
    if (Ill1li1i && Ill1li1i.result && Ill1li1i.data?.["drawOk"]) {
      this.putMsg(Ill1li1i.data.name || "空气");
      iI11Iil && (await this.writeLongCache());
      return;
    }
    let lIlIil = Ill1li1i?.["errorMessage"] || Ill1li1i?.["data"]?.["errorMessage"];
    if (!lIlIil) return;
    return this.putMsg(lIlIil), this.wxStop(lIlIil), Ill1li1i;
  }
  async ["login"](iiIlIilI = true, iliilIIi = this.isvToken) {
    if (this.mode === "100") {
      let I1IiliIl = {
        "activityId": this.activityId,
        "tokenPin": iliilIIi,
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
      let i1i1iliI = await this.taskPostByJson("api/user-info/login", I1IiliIl);
      if (i1i1iliI && i1i1iliI.resp_code === 0) {
        this.token = i1i1iliI.data.token;
        this.headers.token = i1i1iliI.data.token;
        let liIllIl1 = this.haskey(i1i1iliI, "data.joinInfo.joinCodeInfo.joinCode");
        this.joinDes = i1i1iliI.data.joinInfo.joinCodeInfo.joinDes;
        this.log("登录成功|" + liIllIl1 + "|" + this.joinDes);
        IlIIlIli.activity.shopId = i1i1iliI.data.shopId;
        this.shopId = i1i1iliI.data.shopId;
        this.joinCode = liIllIl1;
        const I1ii1l1 = /venderId=(\d+)/,
          iI1I1ll = i1i1iliI.data.joinInfo?.["openCardUrl"];
        this.venderId = iI1I1ll ? iI1I1ll.match(I1ii1l1)[1] : this.shopId;
        IlIIlIli.activity = {
          ...IlIIlIli.activity,
          "shopId": this.shopId,
          "venderId": this.venderId
        };
        if (liIllIl1 === "1003" || this.lzkjOpenCard && ["1005", "1002", "1006"].includes(liIllIl1) && !this.openCardTypes.includes(this.activityType)) return this.putMsg(this.joinDes), this.exit();
        await this.lzkjApi("api/task/followShop/follow");
        iiIlIilI && (await this.lzkjBaseInfo());
      } else this.putMsg(i1i1iliI?.["resp_msg"] || "登录失败"), this.wxStop(i1i1iliI?.["resp_msg"]), this.exit();
      return i1i1iliI;
    } else {
      if (["hdb"].includes(this.mode)) {
        let l11li1li = await this.taskPostByJson("front/fans/login", {
          "appJsonParams": {
            "id": this.activityId,
            "source": "01",
            "userId": this.userId,
            "token": iliilIIi,
            "method": "/front/fans/login"
          },
          "sysParams": {
            "sign": "111111",
            "timestamp": 123456,
            "sysmethod": "/front/fans/login"
          }
        });
        if (l11li1li && l11li1li?.["code"] == 200) this.buyerNick = l11li1li?.["result"]?.["buyerNick"], this.aesBuyerNick = l11li1li?.["result"]?.["aesBuyerNick"], this.userId = l11li1li?.["result"]?.["userId"], this.openCard = l11li1li?.["result"]?.["openCard"], IlIIlIli.activity.shopId = this.userId, IlIIlIli.activity.venderId = this.userId;else {
          if (l11li1li?.["message"]?.["includes"]("商家订购过期")) this.putMsg("商家订购过期"), this.stop();else {
            this.putMsg(l11li1li?.["message"] || "登录失败");
            this.exit();
          }
        }
        return l11li1li;
      } else {
        if (this.mode === "v2") {
          let Il1IiIl = await this.v2Api("api/user/login", {
            "token": iliilIIi,
            "source": "01",
            "activityType": this.activityType,
            "templateCode": this.templateCode,
            "activityId": this.activityId,
            "shopId": this.shopId,
            "uuid": this.phoneInfo.uuid,
            "timestamp": this.timestamp()
          });
          if (Il1IiIl && Il1IiIl?.["code"] === 200) {
            this.headers["Pin-Token"] = Il1IiIl?.["data"]?.["pinToken"];
            this.headers["Activity-Id"] = this.activityId;
            this.headers["Shop-Id"] = this.shopId;
            this.headers["Activity-Type"] = this.activityType;
            this.headers["Template-Code"] = this.templateCode;
            this.secretPin = Il1IiIl?.["data"]?.["encryptPin"];
            await this.getActivityBase();
          } else this.putMsg(Il1IiIl?.["message"] || "登录失败"), this.exit();
          return Il1IiIl;
        }
      }
    }
  }
  async ["lzkjBaseInfo"]() {
    this.needPinToken && (await this.initPinToken());
    await this.basicInfo();
    await this.getPrizeList();
    this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(iIllii1l => ![2].includes(iIllii1l.prizeType) && iIllii1l.leftNum !== 0).length === 0 && (this.putMsg("垃圾活动"), this.stop());
    if (!["1001", "1004"].includes(this.joinCode) && this.openCardTypes.includes(this.activityType)) return await this.bindWithVender(), await this.login(false);
    if (this.joinCode === "1004") await this.login(false);
  }
  async ["basicInfo"]() {
    let IIIi1lII = await this.taskPostByJson("api/active/basicInfo", {
      "activityId": this.activityId
    });
    if (IIIi1lII && IIIi1lII.resp_code === 0) {
      const ll1ililI = {
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
          shopName: IliIIIiI,
          startTime: II1illi1,
          endTime: IIIi1i1I,
          actType: iIl111li
        } = IIIi1lII.data;
      this.actType = iIl111li;
      this.type = ll1ililI[iIl111li]?.["api"];
      this.shopName = IliIIIiI;
      const ii11Ii11 = this.formatDate(II1illi1, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(IIIi1i1I, "yyyy-MM-dd HH:mm:ss");
      IlIIlIli.activity = {
        ...IlIIlIli.activity,
        "shopName": IliIIIiI,
        "actType": iIl111li,
        "startTime": II1illi1,
        "endTime": IIIi1i1I,
        "timeStr": ii11Ii11
      };
      II1illi1 && II1illi1 > Date.now() && (this.putMsg("活动未开始"), IlIIlIli.activity.noStart = true, this.stop());
      IIIi1i1I && IIIi1i1I < Date.now() && (this.putMsg("活动已结束"), await this.writeLongCacheByStop(), this.stop());
      if (!this.type) {
        this.putMsg("未知类型");
        this.exit();
        return;
      }
    }
    return IIIi1lII;
  }
  async ["getDefenseUrls"]() {
    if (IlIIlIli.activity.defenseUrls) return this.defenseUrls = IlIIlIli.activity.defenseUrls;
    const {
      domain: Iil11ll1,
      mode: IilllIil
    } = this;
    let lili1lll;
    if (IilllIil === "wx") lili1lll = "https://" + Iil11ll1 + "/customer/getDefenseUrls";else {
      if (IilllIil === "100") lili1lll = "https://" + this.domain + this.prefix + "/api/user-info/getDefenseUrls";else {
        this.defenseUrls = [];
        return;
      }
    }
    let iiillIII = await this.jd_api({
      "url": lili1lll,
      "maxRedirects": 0
    }, false);
    if (this.haskey(iiillIII, "data")) {
      this.defenseUrls = IilllIil === "wx" ? iiillIII.data : iiillIII.data.map(l11lii => l11lii.interfaceName);
    } else {
      this.defenseUrls = [];
    }
    IlIIlIli.activity.defenseUrls = this.defenseUrls;
  }
  async ["getPrizeList"]() {
    if (IlIIlIli.activity.prizeList) {
      this.prizeList = IlIIlIli.activity.prizeList;
      return;
    }
    let liIi1I11 = await this.lzkjApi("api/prize/drawPrize");
    liIi1I11 && liIi1I11.resp_code === 0 && (this.prizeList = liIi1I11.data?.["prizeInfo"] ?? [], IlIIlIli.activity.prizeList = this.prizeList);
  }
  async ["getUserId"]() {
    let lii1I111 = await this.lzkjApi("api/task/share/getUserId");
    return lii1I111 && lii1I111.resp_code === 0 && (this.shareUserId = lii1I111.data?.["shareUserId"]), lii1I111;
  }
  async ["lzkjToDo"](illi11ii, Ii1ill1 = "", IIiIl1Ii = 0) {
    let iii11I = {
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
      III1I1ii = await this.lzkjApi("api/basic/task/toDo", {
        "taskId": illi11ii,
        "skuId": Ii1ill1
      });
    if (III1I1ii && III1I1ii.resp_code === 0) {
      return this.log("任务[" + (iii11I[IIiIl1Ii] || illi11ii || IIiIl1Ii) + "]完成"), true;
    }
    return false;
  }
  async ["lzkjTask"](ilIl11i = []) {
    try {
      if (ilIl11i.length > 0) {
        for (let liIli1li of ilIl11i) {
          if (liIli1li.status === 1) continue;
          const {
            taskType: iIi1ll1I,
            taskId: iIllll,
            completeCount: I1I11il1,
            oneClickPurchase: iIi1i1ii,
            finishNum: Il1IIIi1,
            maxNum: iIi1II11,
            oneClickFollowPurchase: l1liI1Ii,
            activeLimit = {}
          } = liIli1li;
          if ([8, 13, 15, 22].includes(iIi1ll1I)) continue;
          if ([1, 14].includes(iIi1ll1I)) {
            await this.lzkjToDo(iIllll, "", iIi1ll1I);
            continue;
          }
          if (iIi1i1ii === 0 || l1liI1Ii === 0) {
            await this.lzkjToDo(iIllll, "", iIi1ll1I);
            continue;
          }
          let ilIIi1iI = liIli1li.shareCount || liIli1li.completeCount || 0,
            IIli1II = (iIi1II11 ?? activeLimit?.["limitNum"] ?? 1) * Il1IIIi1;
          if (ilIIi1iI < IIli1II) {
            let I1iliili = liIli1li?.["skuInfoVO"]?.["filter"](liliiIi => liliiIi?.["status"] === 0);
            for (let lllIl1li = 0; lllIl1li < IIli1II; lllIl1li++) {
              await this.lzkjToDo(iIllll, I1iliili?.[lllIl1li]?.["skuId"] || "", iIi1ll1I);
              ilIIi1iI++;
              if (ilIIi1iI >= IIli1II) break;
            }
          }
        }
      }
    } catch (i11l1iii) {
      this.log(i11l1iii.message);
    }
  }
  async ["acquire"](l1ii1l1l) {
    let iI1I11l = await this.lzkjApi("api/prize/receive/acquire", {
      "prizeInfoId": l1ii1l1l,
      "status": 1
    });
    if (iI1I11l && iI1I11l.resp_code === 0) {
      this.putMsg(iI1I11l.data?.["prizeName"]);
      iI1I11l.data.prizeType === 3 && (this.addressId = iI1I11l.data?.["addressId"], this.prizeName = iI1I11l.data?.["prizeName"], await this.saveAddress());
      return;
    }
    this.putMsg(iI1I11l?.["resp_msg"]);
    this.wxStop(iI1I11l?.["resp_msg"]);
  }
  async ["lzkjApi"](i1i1Ilil, IiIIiIlI = {}) {
    return await this.taskPostByJson(i1i1Ilil, IiIIiIlI, {
      "token": this.token
    });
  }
  ["getHmacSha256Sign"](il1II1i1, i1IlliIl) {
    const ilIiil1l = "actid" + this.activityId + "buyernick" + this.aesBuyerNick + "sysmethod" + il1II1i1 + "timestamp" + i1IlliIl;
    return this.hmacSHA256(this.getCookieByName("_sk") || "1111", ilIiil1l);
  }
  async ["hdbApi"](li11liiI, liIiIi1i = {}, Il11lii1 = false, Iiill1ll = true) {
    let IiIi1iIi = Il11lii1 ? "/front/task/" + li11liiI : "/front/activity/" + li11liiI,
      iIlI1i1I = await this.taskPostByJson(IiIi1iIi, {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.userId,
          "method": IiIi1iIi,
          "buyerNick": this.aesBuyerNick,
          ...liIiIi1i
        }
      });
    if (iIlI1i1I && /数字签名不匹配|数字签名已失效|用户未登录/.exec(iIlI1i1I?.["message"]) && Iiill1ll) return await this.login(), await this.hdbApi(li11liiI, liIiIi1i, Il11lii1, false);
    return iIlI1i1I;
  }
  async ["loadFrontAct"]() {
    let iIlIi11I = await this.hdbApi("loadFrontAct");
    if (iIlIi11I && iIlIi11I?.["succ"]) {
      IlIIlIli.activity.shopName = iIlIi11I?.["result"]?.["activity"]?.["shopTitle"];
      let ll1lilll = iIlIi11I.result?.["activity"]?.["startTime"],
        i1I11I1I = iIlIi11I.result?.["activity"]?.["endTime"],
        IiIiIll1 = iIlIi11I.result?.["user"]?.["shopId"],
        I11Ilil = iIlIi11I.result?.["user"]?.["venderId"];
      this.shopId = IiIiIll1;
      this.venderId = I11Ilil;
      this.actType = iIlIi11I.result?.["activity"]?.["actType"];
      IlIIlIli.activity = {
        ...IlIIlIli.activity,
        "shopId": IiIiIll1,
        "venderId": I11Ilil,
        "startTime": ll1lilll,
        "endTime": i1I11I1I
      };
      ll1lilll && ll1lilll > Date.now() && (this.putMsg("活动未开始"), IlIIlIli.activity.noStart = true, this.stop());
      if (i1I11I1I && i1I11I1I < Date.now()) {
        this.putMsg("活动已结束");
        await this.writeLongCacheByStop();
        this.stop();
      }
    }
  }
  async ["reportPVUV"]() {
    await this.hdbApi("reportPVUV");
  }
  async ["loadFrontAward"]() {
    let IIIilIlI = await this.hdbApi("loadFrontAward");
    if (IIIilIlI && IIIilIlI.succ) {
      this.prizeList = IIIilIlI.result ?? [];
      this.prizeList.length > 0 && this.prizeList.filter(IIIIiIil => !["JD_D_COUPON"].includes(IIIIiIil.awardType)).length === 0 && (this.putMsg("垃圾活动"), this.stop());
    }
    return IIIilIlI;
  }
  ["formatDateString"](llliliIl) {
    if (llliliIl?.["match"](/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) return llliliIl.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    return llliliIl;
  }
  async ["getRuleSETime"](illiIli1 = this.rule) {
    const IlilIiii = /(\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}|\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}|\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2})/g,
      I1IlI1li = illiIli1.match(IlilIiii);
    if (I1IlI1li) {
      const illI11lI = this.formatDateString(I1IlI1li[0]),
        Il11ll = this.formatDateString(I1IlI1li[1]);
      this.startTime = new Date(illI11lI).getTime();
      this.endTime = new Date(Il11ll).getTime();
      IlIIlIli.activity.startTime = this.startTime;
      IlIIlIli.activity.endTime = this.endTime;
      this.startTime && this.startTime > Date.now() && (this.putMsg("活动未开始"), IlIIlIli.activity.noStart = true, this.stop());
      this.endTime && this.endTime < Date.now() && (this.putMsg("活动已结束"), await this.writeLongCacheByStop(), this.stop());
    }
  }
  async ["jinggengShopInfo"]() {
    let iiilIlII = await this.taskGet(this.activityUrl);
    if (iiilIlII) {
      let lIlll = lIl1ii.load(iiilIlII);
      const lii1llli = lIlll("#shop_sid").attr("value"),
        l1illi1l = lIlll("#shop_title").attr("value"),
        lIIiI1lI = lIlll("#description").text();
      this.debug("shop_sid", lii1llli);
      this.shopId = lii1llli;
      this.venderId = this.userId;
      this.shopName = l1illi1l;
      this.rule = lIIiI1lI;
      const IllIll11 = lIlll("title").text();
      return IlIIlIli.activity.shopName = this.shopName, IlIIlIli.activity.shopId = this.shopId, IlIIlIli.activity.venderId = this.venderId, await this.getRuleSETime(lIIiI1lI), IllIll11?.["includes"]("已结束") && (this.putMsg("活动已结束"), await this.writeLongCacheByStop(), this.stop()), lIlll;
    }
    return undefined;
  }
  async ["setMixNick"](IllillI = this.isvToken) {
    let IlII1i1 = await this.taskPost("front/setMixNick", {
      "strTMMixNick": IllillI,
      "userId": this.userId,
      "source": "01"
    });
    return this.debug(IlII1i1), IlII1i1 && IlII1i1.succ && (this.mixNick = IlII1i1?.["msg"]), IlII1i1 && IlII1i1?.["msg"]?.["includes"]("商家token过期") && (this.putMsg("商家token过期"), this.stop()), !this.mixNick && (this.putMsg("获取mixNick失败"), this.exit()), IlII1i1;
  }
  async ["jinggengApi"](Iill1llI, I1illiI = {}) {
    let I1Il1l1I = await this.taskPost("ql/front/" + Iill1llI, {
      "act_id": this.activityId,
      "user_id": this.userId,
      ...I1illiI
    });
    return I1Il1l1I;
  }
  async ["gzslApi"](l1lliil1, i1lIiiI = {}, Illl1lII = false) {
    let Iil1l1 = {
      "token": this.isvToken,
      "source": "01",
      "activityId": this.activityId,
      ...i1lIiiI
    };
    Illl1lII && (Iil1l1.wxToken = this.isvToken);
    let li1II1il = await this.taskPostByJson("wuxian/user/" + l1lliil1 + "/" + this.activityId + (Illl1lII ? "?wxToken=" + encodeURIComponent(this.isvToken) : ""), Iil1l1);
    return li1II1il;
  }
  async ["hzbzInfo"]() {
    let lI1liilI = await this.taskGet(this.activityUrl);
    if (!lI1liilI) return;
    let lIiliI11 = this.textToHtml(lI1liilI),
      i1il1Ili = lIiliI11("#draw_info").text();
    i1il1Ili = this.parseJSON(i1il1Ili);
    let iIIiI111 = i1il1Ili?.["stime"] || 0,
      IIlIll1I = i1il1Ili?.["etime"] || 0;
    this.shopName = i1il1Ili?.["shopName"];
    this.shopId = i1il1Ili?.["shopId"];
    this.rule = i1il1Ili?.["drawRule"];
    IlIIlIli.activity.shopId = this.shopId;
    IlIIlIli.activity.venderId = this.shopId;
    IlIIlIli.activity.shopName = this.shopName;
    IlIIlIli.activity.startTime = iIIiI111;
    IlIIlIli.activity.endTime = IIlIll1I;
    if (iIIiI111 && iIIiI111 > this.timestamp()) {
      this.putMsg("活动未开始");
      this.stop();
      return;
    }
    if (IIlIll1I && IIlIll1I < this.timestamp()) {
      this.putMsg("活动已结束");
      await this.writeLongCacheByStop();
      this.stop();
      return;
    }
    return lIiliI11;
  }
  async ["hzbzApi"](lilli1i1, liI1liI = {}) {
    let l1iilI1 = await this.taskPost("bigdraw/" + lilli1i1, liI1liI);
    return l1iilI1;
  }
  async ["v2Api"](llII1iI, I1IIiiii = undefined) {
    let ii1Ii1li = await this.taskPostByJson(llII1iI, this.encryptCrypto("AES", "CBC", "Pkcs7", "2JjUvJEAsA2Yog==", JSON.stringify(I1IIiiii, null, 2), "Hd5W5ONsYKmGm9QA"));
    return ii1Ii1li && ii1Ii1li.data && (ii1Ii1li.data = ii1Ii1li?.["data"] ? this.str2Json(this.decryptCrypto("AES", "CBC", "Pkcs7", "2JjUvJEAsA2Yog==", ii1Ii1li.data, "Hd5W5ONsYKmGm9QA")) : ii1Ii1li.data), ii1Ii1li;
  }
  async ["getActivityBase"]() {
    let Iiii1iil = await this.v2Api("api/common/getActivityBase");
    this.debug(Iiii1iil);
    if (Iiii1iil && Iiii1iil.code === 200) {
      this.shopName = Iiii1iil.data.shopName;
      let IiilIil1 = Iiii1iil.data.startTime,
        IliIliIl = Iiii1iil.data.endTime,
        IIlIli = Iiii1iil.data.openCardLink ?? "";
      this.venderId = this.getQueryString(IIlIli, "venderId") ?? this.shopId;
      IiilIil1 && IiilIil1 > this.timestamp() && (this.putMsg("活动未开始"), IlIIlIli.activity.noStart = true, this.stop());
      IliIliIl && IliIliIl < this.timestamp() && (this.putMsg("活动已结束"), await this.writeLongCacheByStop(), this.stop());
      let li1Ii11I = Iiii1iil.data.thresholdResponseList ?? [];
      for (let illi1l11 of li1Ii11I) {
        if (illi1l11?.["type"] === 2 || illi1l11?.["type"] === 1) {
          await this.v2Api("api/common/followShop");
          if (illi1l11?.["type"] === 1) this.openCard = false;
          continue;
        }
      }
      IlIIlIli.activity.shopName = this.shopName;
      IlIIlIli.activity.startTime = IiilIil1;
      IlIIlIli.activity.endTime = IliIliIl;
      IlIIlIli.activity.shopId = this.shopId;
      IlIIlIli.activity.venderId = this.venderId;
      return;
    }
    this.putMsg(Iiii1iil?.["message"] || "获取活动信息失败");
    this.wxStop(Iiii1iil?.["message"]);
    this.exit();
  }
  async ["v2Task"]() {
    let l11lIii = await this.v2Api("api/" + this.activityType + "/getTask");
    this.debug(l11lIii);
    if (l11lIii && l11lIii.code === 200) {
      let llI1lIll = l11lIii?.["data"] || [];
      for (let liIIiIli of llI1lIll) {
        if (liIIiIli.taskFinishGiveAllLotteryCount >= liIIiIli.totalLimit) continue;
        switch (liIIiIli.taskType) {
          case 2:
          case 10:
          case 12:
            await this.v2ToDoTask(liIIiIli.taskType);
            break;
          case 5:
          case 7:
          case 9:
            if ([5, 7].includes(liIIiIli.taskType) && liIIiIli.optWay === 2) {
              this.debug("一键任务");
              await this.v2ToDoTask(liIIiIli.taskType);
              break;
            }
            let IiI1il1l = liIIiIli.taskType === 5 ? "getFollowSkuTaskSkuList" : liIIiIli.taskType === 7 ? "getTaskAddSku" : "getShareSkuTaskSkuList",
              i11Iilll = await this.v2Api("api/" + this.activityType + "/" + IiI1il1l),
              i1Iili1 = [5, 9].includes(liIIiIli.taskType) ? i11Iilll?.["data"]?.["filter"](lIli1II => !lIli1II.isOperated) || [] : i11Iilll?.["data"]?.["filter"](ll1Iil11 => ll1Iil11.status === 0) || [];
            for (let l1I1l1il = liIIiIli.taskUnitFinishCount || 0; l1I1l1il < Math.min(liIIiIli.perOperateCount * liIIiIli.limit, i1Iili1.length); l1I1l1il++) {
              await this.v2ToDoTask(liIIiIli.taskType, i1Iili1.shift().skuId);
            }
            break;
        }
      }
    }
  }
  async ["v2ToDoTask"](liil1iII, liliI11I = "", iiIiIIii = null) {
    let IllII1il = {
        2: "浏览店铺",
        5: "关注商品",
        7: "加购商品",
        8: "购买商品",
        9: "分享商品",
        10: "分享店铺",
        12: "分享活动"
      },
      lIi1lI1 = iiIiIIii ?? {
        2: "browseShop",
        5: "followSku",
        7: "addSku",
        9: "shareSku",
        10: "shareShop",
        12: "shareActivity"
      },
      il11iil = await this.v2Api("api/" + this.activityType + "/" + lIi1lI1[liil1iII], {
        "skuId": liliI11I
      });
    this.debug(il11iil, "api/" + this.activityType + "/" + lIi1lI1[liil1iII], liliI11I);
    if (il11iil && il11iil.code === 200) return this.log("任务[" + (IllII1il[liil1iII] || liliI11I || liil1iII) + "]完成"), il11iil.data;
  }
}
class lI1l11l1 {
  constructor(iIillIii) {
    this.activityUrl = iIillIii;
    this.switchInterval = iIl1IlI1.wxProxyInterval;
    this.proxyEnable = false;
    this.proxyState = true;
    this.wxProxyMode = iIl1IlI1.wxProxyMode;
    this.proxie = null;
    this.currentIndex = 0;
    this.isLocked = false;
    this.wxProxyCheck = iIl1IlI1.wxProxyCheck;
    this.subscriptionUrls = typeof iIl1IlI1.wxProxyUrl === "string" ? iIl1IlI1.wxProxyUrl.split("@@").filter(i1lIil1i => i1lIil1i && i1lIil1i.trim()).map((l1iIi1i, IIiI1Iii) => {
      return {
        "name": IIiI1Iii + 1,
        "url": l1iIi1i,
        "priority": 1,
        "enabled": true
      };
    }) : iIl1IlI1.wxProxyUrl.filter(Ii1iI1 => Ii1iI1.enabled).sort((illiii11, ll11IIIl) => ll11IIIl.priority - illiii11.priority);
  }
  ["log"](...Il1iIlIl) {
    iIl1IlI1.logger.info("proxy|", ...Il1iIlIl);
  }
  ["updateProxyEnable"](Iiillii) {
    !Iiillii && (this.proxie = null, this.proxyState = false);
    this.proxyEnable = Iiillii;
  }
  async ["acquireLock"]() {
    if (!this.isLocked) return this.isLocked = true, {};
    while (this.isLocked) {
      await new Promise(iilI1l => setTimeout(iilI1l, 100));
    }
    return {};
  }
  ["releaseLock"]() {
    this.isLocked = false;
  }
  async ["fetchProxies"](liI111li = 10) {
    if (this.subscriptionUrls.length === 0) return this.log("没有启用的代理订阅地址"), false;
    let lll1111 = 0;
    const {
      name = lll1111,
      url: iilI1Il1
    } = this.subscriptionUrls[lll1111];
    try {
      const Ii1lIIIl = await IliilIlI.get(iilI1Il1),
        il11l1Ii = typeof Ii1lIIIl.data === "object" && Ii1lIIIl.data !== null ? JSON.stringify(Ii1lIIIl.data) : Ii1lIIIl.data,
        i111IlIl = /((\w+:\w+@\w+\.\w+:\d+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)|([\w-]+\.[\w.-]+:\d+))(?![\u4e00-\u9fa5])/g,
        i1lIIil1 = il11l1Ii.match(i111IlIl);
      if (i1lIIil1) {
        this.log("已成功从[" + name + "]提取[" + i1lIIil1.length + "]ip");
        if (this.wxProxyMode === 2) this.proxie = i1lIIil1;else {
          this.proxie = [i1lIIil1[0]];
          this.log("获取到的ip:" + this.proxie[0]);
          if (this.wxProxyCheck === 1 && !(await this.checkPing(this.proxie[0]))) {
            if (liI111li > 0) {
              return this.log(this.proxie[0] + "不通,正在重新获取..."), await new Promise(iliII111 => setTimeout(iliII111, 2000)), await this.fetchProxies(liI111li - 1);
            } else return false;
          }
        }
        return true;
      } else {
        this.log(il11l1Ii);
        const illllIi1 = "[" + name + "]提取ip失败";
        this.subscriptionUrls.splice(lll1111, 1);
        if (this.subscriptionUrls.length === 0) return this.log(illllIi1 + ",已无可用代理地址,退出代理"), false;
        return this.log(illllIi1 + ",降级提取"), await this.fetchProxies(liI111li - 1);
      }
    } catch (I1IliI1l) {
      const lI11i11l = "[" + name + "]订阅地址失效";
      this.subscriptionUrls.splice(lll1111, 1);
      if (this.subscriptionUrls.length === 0) {
        return this.log(lI11i11l + ",已无可用代理地址,退出代理"), false;
      }
      return this.log(lI11i11l + ",降级提取"), await this.fetchProxies(liI111li);
    }
  }
  async ["setCurrentProxy"](lIlliIII = false) {
    if (!this.proxyState) return false;
    if (!lIlliIII && this.wxProxyMode === 2 && this.proxie?.["length"] > 0) return true;
    if (!this.isLocked) {
      this.lock = await this.acquireLock();
      try {
        if (this.subscriptionUrls.length === 0) return false;
        if (!(await this.fetchProxies())) return this.log("获取代理ip失败,退出代理"), this.updateProxyEnable(false), false;
        return true;
      } finally {
        this.releaseLock();
      }
    } else return await this.acquireLock(), true;
  }
  async ["getProxy"](Ill1Ili = 10) {
    let i111ll1 = this.proxie.shift();
    if (!i111ll1 && Ill1Ili <= 0) return null;
    if (!i111ll1) return await this.setCurrentProxy(), await this.getProxy(Ill1Ili - 1);
    if (this.wxProxyCheck === 1 && !(await this.checkPing(i111ll1))) return Ill1Ili > 0 ? (this.log(i111ll1 + "不通,正在重新获取..."), await this.getProxy(Ill1Ili - 1)) : null;
    return i111ll1;
  }
  ["cleanProxy"]() {
    this.proxie = null;
  }
  async ["getCurrentProxy"]() {
    if (!this.proxyEnable) {
      return null;
    }
    return (!this.proxie || this.proxie?.["length"] === 0) && (await this.setCurrentProxy()), this.proxie ? this.proxie.length === 1 && this.wxProxyMode === 1 ? this.proxie[0] : await this.getProxy() : null;
  }
  async ["checkPing"](liI1iiii) {
    try {
      const liil1li = liI1iiii.split(":");
      if (liil1li.length !== 2) return false;
      return await I1II1lIl({
        "url": this.activityUrl || "https://www.jd.com",
        "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
        },
        "httpsAgent": new IIIlIII1("http://" + liI1iiii),
        "timeout": 4000
      }), true;
    } catch (ii1I1IIl) {
      return false;
    }
  }
}
class iIIIili1 {
  constructor(iI111iii, Illliill) {
    this.cookies = iI111iii;
    this.TaskClass = Illliill;
    this._tasks = {};
  }
  *["taskGenerator"]() {
    for (let i1IIllii = 0; i1IIllii < this.cookies.length; i1IIllii++) {
      !(i1IIllii in this._tasks) && (this._tasks[i1IIllii] = new this.TaskClass(i1IIllii, this.cookies[i1IIllii]));
      yield this._tasks[i1IIllii];
    }
  }
  ["getTask"](iiI1li1i) {
    return !(iiI1li1i in this._tasks) && iiI1li1i < this.cookies.length && (this._tasks[iiI1li1i] = new this.TaskClass(iiI1li1i, this.cookies[iiI1li1i])), this._tasks[iiI1li1i];
  }
  get ["cookie_all_obj"]() {
    const li11llli = this;
    return new Proxy([], {
      "get"(iIiilIi, Ill11li1) {
        if (Ill11li1 === "length") return li11llli.cookies.length;
        if (typeof Ill11li1 === "string" && !isNaN(Ill11li1)) {
          const Il1I1lIl = Number(Ill11li1);
          if (Il1I1lIl < li11llli.cookies.length) {
            return li11llli.getTask(Il1I1lIl);
          }
        }
        return iIiilIi[Ill11li1];
      },
      "ownKeys"() {
        return Array.from({
          "length": li11llli.cookies.length
        }, (i11lIii, iliIll1l) => String(iliIll1l));
      },
      "getOwnPropertyDescriptor"(ll1lII1, IlIiiI1I) {
        if (typeof IlIiiI1I === "string" && !isNaN(IlIiiI1I)) {
          const lllliiI = Number(IlIiiI1I);
          if (lllliiI < li11llli.cookies.length) {
            return {
              "configurable": true,
              "enumerable": true,
              "get": () => li11llli.cookie_all_obj[lllliiI],
              "set": lI1lliI => {
                li11llli.cookie_all_obj[lllliiI] = lI1lliI;
              }
            };
          }
        }
        return undefined;
      }
    });
  }
  ["filter"](li1iii) {
    const lilIlili = [];
    for (let l1i1li1 = 0; l1i1li1 < this.cookies.length; l1i1li1++) {
      const Il1IIIIl = this.getTask(l1i1li1);
      li1iii(Il1IIIIl) && lilIlili.push(Il1IIIIl);
    }
    return lilIlili;
  }
  ["map"](ll1ii1iI) {
    const lIlllIl1 = [];
    for (let l11IlI1i = 0; l11IlI1i < this.cookies.length; l11IlI1i++) {
      const lIl1II11 = this.getTask(l11IlI1i);
      lIlllIl1.push(ll1ii1iI(lIl1II11));
    }
    return lIlllIl1;
  }
  ["forEach"](il1ilI1I) {
    for (let ili1lI1i = 0; ili1lI1i < this.cookies.length; ili1lI1i++) {
      const l1iIlll1 = this.getTask(ili1lI1i);
      il1ilI1I(l1iIlll1);
    }
  }
  ["find"](l1I11li1) {
    for (let II1iiII = 0; II1iiII < this.cookies.length; II1iiII++) {
      const liIlllIi = this.getTask(II1iiII);
      if (l1I11li1(liIlllIi)) {
        return liIlllIi;
      }
    }
    return undefined;
  }
}
class Iii1iI1i {
  static ["activity"] = {};
  static ["msg"] = [];
  static ["proxy"];
  static ["running"] = true;
  static ["cookies"] = [];
  static ["paddedStringEndCount"] = 0;
  static ["concurrencyLimit"] = 0;
  static ["version"] = "3.0.6";
  static ["envInfo"] = {};
  static ["cookieInit"]() {
    let ii111i1l = [],
      iiIII1i1 = [];
    Object.keys(Il1ii11).forEach(iiI1lli1 => {
      ii111i1l.push(Il1ii11[iiI1lli1]);
    });
    if (iIl1IlI1.wxEnableOtherEnv === 2) {
      let iI1IiIli = this.readFileSync("./env/ck.txt");
      iiIII1i1 = iI1IiIli.split("\n").map(lI1lIiI => lI1lIiI.trim()).filter(iliii1ii => iliii1ii !== "");
      ii111i1l = ii111i1l.concat(iiIII1i1.filter(l11111iI => !ii111i1l.includes(l11111iI)));
    }
    let IiI111Il = this.readFileSync("./env/invite_ck.txt"),
      I1I1llI1 = IiI111Il.split("\n").map(II111ill => II111ill.trim()).filter(Il1ilII1 => Il1ilII1 !== "");
    return [ii111i1l, I1I1llI1];
  }
  static ["log"](...iIl1I1) {
    iIl1IlI1.logger.info("run  |", ...iIl1I1);
  }
  static ["readFileSync"](ll1llIll) {
    try {
      return l1I11II1.readFileSync(ll1llIll, "utf-8").toString();
    } catch (I111IIiI) {
      return "";
    }
  }
  static async ["runTasksConcurrentlyWithDelay"](ii1ilIl1, Iiiliill, iI1ili1, IiI1Iii = false, ilIl1l1 = true) {
    const liliiiI1 = [],
      lliiIliI = new Set();
    let ll111lI1 = this;
    async function liI1lIii(Ilil111) {
      try {
        await new Promise(llI11IIi => setTimeout(llI11IIi, iI1ili1));
        const I111iili = await Ilil111();
        liliiiI1.push(I111iili);
      } catch (ii1Illi1) {
        if (ii1Illi1 instanceof i1I1IiII) {
          ll111lI1.running = false;
          ll111lI1.centralReject(new i1I1IiII());
        } else {
          if (ii1Illi1 instanceof iiiIIIll) {} else ll111lI1.log(ii1Illi1?.["message"] || ii1Illi1);
        }
      }
    }
    for (const il1llIlI of ii1ilIl1) {
      if (!this.running && ilIl1l1) break;
      const lI1lIii1 = IiI1Iii ? this.concurrencyLimit : Iiiliill;
      lliiIliI.size >= lI1lIii1 && (await Promise.race(lliiIliI));
      const iIiIi1li = liI1lIii(il1llIlI);
      lliiIliI.add(iIiIi1li);
      iIiIi1li.then(() => lliiIliI.delete(iIiIi1li));
    }
    const l1ll111 = new Promise((IiilII11, IIlIIil1) => {
      ll111lI1.centralResolve = IiilII11;
      ll111lI1.centralReject = IIlIIil1;
    });
    return l1ll111.then(() => {
      lliiIliI.forEach(iIiiIll1 => iIiiIll1.catch(() => {}));
    }).catch(() => {}), await Promise.all(lliiIliI), liliiiI1;
  }
  static ["get_mains_obj"]() {
    try {
      let IIl1lli1 = this.taskManager.find(ill1iil1 => ill1iil1.index < this.cookieLength && ill1iil1.needHelp && !ill1iil1.isInviter);
      if (iIl1IlI1.leaderNum && IIl1lli1.index >= iIl1IlI1.leaderNum) return null;
      return IIl1lli1.isInviter = true, IIl1lli1;
    } catch (i1Il1IIl) {
      return null;
    }
  }
  static ["get_Invite_obj"](liii1iiI = null, iiII1i1i = []) {
    try {
      if (liii1iiI?.["inviteMode"] === 2) {
        let I1i1li = this.taskManager.find(llll1l1 => !llll1l1.isUse && llll1l1.canHelp && llll1l1.pin !== liii1iiI.pin);
        return I1i1li.isUse = true, I1i1li;
      } else {
        if (liii1iiI?.["inviteMode"] === 1) {
          const i1i1iili = iiII1i1i.map(IllIl1l => IllIl1l.pin);
          let llllli1 = this.taskManager.find(lI1ilII1 => liii1iiI.pin != lI1ilII1.pin && lI1ilII1.canHelp && !i1i1iili.includes(lI1ilII1.pin));
          return llllli1;
        } else {
          let lI1il11i = this.taskManager.find(iliIl1I1 => !iliIl1I1.isUse && iliIl1I1.canHelp && !iliIl1I1.isInviter);
          return lI1il11i.isUse = true, lI1il11i;
        }
      }
    } catch (iiI11lIi) {
      return null;
    }
  }
  static ["stopAllThreads"]() {
    ilIiilII.emit("stopAllThreads");
  }
  static async ["checkAbortSignal"](Ii11lil, iiI1lIII) {
    return new Promise((Il1I1il1, lIIll1ll) => {
      iiI1lIII.addEventListener("abort", () => {
        lIIll1ll(new lllli1iI("Aborted"));
      });
      Ii11lil.then(Il1I1il1).catch(lIIll1ll);
    });
  }
  static async ["async_thread"](iiI1I111, II1Iili) {
    const i1li1Ill = new li1Iil1(),
      i1ll11il = i1li1Ill.signal;
    ilIiilII.on("stopAllThreads", () => {
      i1li1Ill.abort();
    });
    while (this.running) {
      let lilIiIii = this.get_mains_obj();
      if (!lilIiIii) return;
      try {
        await this.checkAbortSignal(lilIiIii.userTask(), i1ll11il);
        if (II1Iili?.["inviteTask"]) {
          if (!lilIiIii.isBlack) {
            if (lilIiIii.needHelp) {
              lilIiIii.log("开始邀请");
              let i11lII11 = [];
              while (lilIiIii.needHelp) {
                let iliI1ilI = [];
                if (lilIiIii.helpedCount >= IlIIlIli.activity.maxHelpCount) {
                  lilIiIii.needHelp = false;
                  lilIiIii.log("助力已满");
                  break;
                }
                for (let iIIlIiIl = 0; iIIlIiIl < Math.abs(Math.min(...[IlIIlIli.activity.maxHelpCount - lilIiIii.helpedCount, II1Iili?.["thread"] || 1, IlIIlIli.activity.customThread].filter(Il1II1li => typeof Il1II1li === "number"))); iIIlIiIl++) {
                  let lIlI1Iil = this.get_Invite_obj(lilIiIii, i11lII11);
                  lIlI1Iil && (iliI1ilI.push(lIlI1Iil), i11lII11.push(lIlI1Iil));
                }
                if (iliI1ilI.length === 0) {
                  lilIiIii.log("已无助力号,退出线程 threads[" + iiI1I111 + "]");
                  return;
                }
                let l1IliiIl = [];
                for (let iiiIl11 of iliI1ilI) {
                  l1IliiIl.push(() => iiiIl11.inviteTask(lilIiIii));
                }
                await this.runTasksConcurrentlyWithDelay(l1IliiIl, l1IliiIl.length, 10);
              }
            }
          }
        }
      } catch (iIl1IlIi) {
        if (iIl1IlIi instanceof lllli1iI) {} else {
          if (iIl1IlIi instanceof i1I1IiII) {
            this.running = false;
            this.stopAllThreads();
          } else {
            if (iIl1IlIi instanceof iiiIIIll) {} else this.log(iIl1IlIi?.["message"] || iIl1IlIi);
          }
        }
      }
    }
  }
  static ["formatDate"](lIlIii1l, I1II1i1) {
    return i1I1IlI1(typeof lIlIii1l === "object" ? lIlIii1l : new Date(typeof lIlIii1l === "string" ? lIlIii1l * 1 : lIlIii1l), I1II1i1 || "yyyy-MM-dd");
  }
  static ["maskString"](iIIi, I11liI1, ll1ill, IiI1Ilii = 4) {
    if (iIIi.length <= I11liI1 + ll1ill) {
      return iIIi;
    }
    const i11IIlll = iIIi.slice(0, I11liI1),
      Ili1I1i = iIIi.slice(-ll1ill),
      Iil1llIi = "*".repeat(IiI1Ilii);
    return i11IIlll + Iil1llIi + Ili1I1i;
  }
  static async ["notify"](I1lili1i, i1ilIi1 = {}) {
    if (i1ilIi1?.["noPush"]) return;
    const lIIllllI = Iii1iI1i.envInfo.name;
    let lIliI1Ii = this.taskManager.filter(ll1Il1II => ll1Il1II.index < this.cookieLength && ll1Il1II.sendMsg?.["length"] > 0).map(IIII1iII => IIII1iII.index + 1 + "【" + (iIl1IlI1.messageMasked === 1 && !IIII1iII.remarks ? this.maskString(IIII1iII.pin, 2, 3, 4) : IIII1iII.remarks || IIII1iII.pin) + "】" + IIII1iII.sendMsg.join(",")).join("\n") + "\n\n";
    if (IlIIlIli.activity.shopName) {
      lIliI1Ii += "#" + IlIIlIli.activity.shopName + "\n";
    }
    if (IlIIlIli.activity.shopId || IlIIlIli.activity.venderId) {
      lIliI1Ii += "店铺信息:" + IlIIlIli.activity.shopId + "_" + IlIIlIli.activity.venderId + "\n";
    }
    IlIIlIli.activity.timeStr && (lIliI1Ii += "活动时间:" + IlIIlIli.activity.timeStr + "\n");
    if (!IlIIlIli.activity.timeStr && IlIIlIli.activity.startTime && IlIIlIli.activity.endTime) {
      lIliI1Ii += "活动时间:" + this.formatDate(IlIIlIli.activity.startTime, "yyyy-MM-dd HH:mm:ss") + "至" + this.formatDate(IlIIlIli.activity.endTime, "yyyy-MM-dd HH:mm:ss") + "\n";
    }
    IlIIlIli.activity.drawTimeStr && (lIliI1Ii += "开奖时间:" + IlIIlIli.activity.drawTimeStr + "\n");
    if (this.activity.activityUrl && !i1ilIi1?.["noPushUrl"]) {
      lIliI1Ii += "活动地址:" + this.activity.activityUrl + "\n\n";
    }
    return IlIIlIli.activity.shopId && (lIliI1Ii += "https://shop.m.jd.com/shop/home?shopId=" + IlIIlIli.activity.shopId + "\n\n"), lIliI1Ii += "时间:" + i1I1IlI1(Date.now(), "yyyy-MM-dd HH:mm:ss.SSS") + " 时长:" + I1lili1i + "s", await liIliiiI.sendNotify(lIIllllI, lIliI1Ii), lIliI1Ii;
  }
  static async ["sendMessage"](i1llil, il1llI1, II1i1111, l11111 = 0, iIIlIl1I = 1) {
    let illiil1l = {
        "url": "https://" + (process.env.TG_API_HOST ?? "api.telegram.org") + "/bot" + i1llil + "/sendMessage",
        "data": {
          "chat_id": il1llI1,
          "text": II1i1111,
          "disable_web_page_preview": true
        },
        "headers": {
          "Content-Type": "application/json",
          "Cookie": "10089"
        },
        "timeout": 15000
      },
      {
        data: il111l1l
      } = await IliilIlI(illiil1l);
    this.log("发送数据", II1i1111);
    il111l1l.ok && (await this.checkWriteToRedis(II1i1111, l11111));
    if (!il111l1l?.["ok"] && iIIlIl1I === 1) {
      this.log("重试中", II1i1111);
      await this.sendMessage(il1llI1, II1i1111, l11111, iIIlIl1I++);
    }
  }
  static #universalCaesarCipher(ll1illi1, Ii1I1ill) {
    return ll1illi1.split("").map(l1I1lIl1 => this.#shiftCharUniversal(l1I1lIl1, Ii1I1ill)).join("");
  }
  static #shiftCharUniversal(lilIii1, il1lIl1I) {
    const i1l1liIl = lilIii1.charCodeAt(0);
    if (i1l1liIl >= 32 && i1l1liIl <= 126) return String.fromCharCode((i1l1liIl - 32 + il1lIl1I) % 95 + 32);
    return lilIii1;
  }
  static ["timestampToCron"](Iili1iI) {
    const lIII1Ill = new Date(Iili1iI),
      liI1I1iI = lIII1Ill.getSeconds(),
      liI1iiI1 = lIII1Ill.getMinutes(),
      li1lI = lIII1Ill.getHours(),
      IIII11II = lIII1Ill.getDate(),
      i1iiliI = lIII1Ill.getMonth() + 1,
      ll1iii = liI1I1iI + " " + liI1iiI1 + " " + li1lI + " " + IIII11II + " " + i1iiliI + " *";
    return ll1iii;
  }
  static ["sendTimeNotify"]() {
    let i1lIlI = [];
    return IlIIlIli.activity.sendStartFiexd && i1lIlI.push(() => this.sendMessage(iI111l1i.scheduleTgBotToken, iI111l1i.scheduleTgUserId, "spy定时插队 " + this.timestampToCron(IlIIlIli.activity.startTime - 3000) + " " + this.activity.activityUrl, 0)), IlIIlIli.activity.sendDrawFiexd && i1lIlI.push(() => this.sendMessage(iI111l1i.scheduleTgBotToken, iI111l1i.scheduleTgUserId, "spy定时插队 " + this.timestampToCron(IlIIlIli.activity.drawTime - 3000) + " " + this.activity.activityUrl, 1)), i1lIlI;
  }
  static ["sendNotifyToUser"]() {
    let Ii1I1i1i = [];
    if (iIl1IlI1.messageSingle === 1 && iI111l1i.pushTgBotToken) {
      const Ii11iiI = /计划余额不足|无法发放|当天已经兑完/,
        IiillIii = Iii1iI1i.envInfo.name,
        i1Illlll = this.activity.activityUrl ? "活动链接:" + this.activity.activityUrl + "\n\n" : "",
        lIIl1I = "通知时间: " + i1I1IlI1(Date.now(), "yyyy-MM-dd HH:mm:ss.SSS") + "\nBy: 小熊私人小助理✨";
      for (let IiiiI1iI of this.taskManager.cookie_all_obj) {
        if (IiiiI1iI.tg_id && IiiiI1iI.sendMsg.length > 0 && IiiiI1iI.sendMsg.some(i1IiIi1I => i1IiIi1I.match(iIl1IlI1.pushRuleRegx) && !Ii11iiI.test(i1IiIi1I))) {
          let I11iIi1 = "【" + IiiiI1iI.pin + "】" + IiiiI1iI.sendMsg.join(",") + "\n\n",
            l1llIlI1 = iI111l1i.pushUserDetail?.["split"]("|")?.["includes"](IiiiI1iI.pin) ? IiillIii + "\n\n" + I11iIi1 + i1Illlll : I11iIi1;
          l1llIlI1 += lIIl1I;
          Ii1I1i1i.push(() => this.sendMessage(iI111l1i.pushTgBotToken, IiiiI1iI.tg_id, l1llIlI1));
        }
      }
    }
    return Ii1I1i1i;
  }
  static ["__as"](IlIIllll) {
    const IllIIi1I = [];
    for (let IllliIiI of IlIIllll) {
      if (typeof IllliIiI === "string") {
        const iili1IlI = IllliIiI.split("-"),
          Iii11III = parseInt(iili1IlI[0], 10),
          lIliIIii = parseInt(iili1IlI[1], 10);
        if (lIliIIii - Iii11III === 1) {
          IllIIi1I.push(Iii11III, lIliIIii);
        } else {
          let i1lI1i1 = Array.from({
            "length": lIliIIii - Iii11III + 1
          }, (illlIiI, ii1i1IiI) => Iii11III + ii1i1IiI);
          IllIIi1I.push(...i1lI1i1);
        }
      } else {
        IllIIi1I.push(IllliIiI);
      }
    }
    return IllIIi1I;
  }
  static async #au() {
    try {
      let l111llIl = await IliilIlI({
        "url": this.#universalCaesarCipher("kwws=227:143<14661;7=:<:<2dxwk0ehdu", -3),
        "method": "POST",
        "data": {
          "fn": this.envInfo.runName
        },
        "headers": {
          "Content-Type": "application/json",
          "token": iI111l1i.apiToken,
          "_ts": Date.now(),
          "_vs": this.version,
          "_isv": this.envInfo.version,
          "_uuid": IIlI1iII()
        }
      });
      l111llIl && l111llIl.data && l111llIl.data.success ? this.auth = l111llIl.data?.["data"]?.["auth"] ?? 0 : (this.log(l111llIl?.["data"]?.["msg"] || "鉴权失败"), process.exit(0));
    } catch (IIilllI1) {
      this.log("鉴权失败,请联系作者", IIilllI1.message);
      process.exit(0);
    }
  }
  static #overwriteConfig(ii1ii1i) {
    if (this.auth !== 1 && ii1ii1i.inviteTask) {
      ii1ii1i.main_thread = 1;
      iIl1IlI1.leaderNum = Math.min(iIl1IlI1.leaderNum, 10);
    }
  }
  static ["match"](ll11i1li, i1I1l11) {
    ll11i1li = ll11i1li instanceof Array ? ll11i1li : [ll11i1li];
    for (let l1l11i1I of ll11i1li) {
      const IIl1IIi1 = l1l11i1I.exec(i1I1l11);
      if (IIl1IIi1) {
        const iliilIlI = IIl1IIi1.length;
        if (iliilIlI === 1) {
          return IIl1IIi1;
        } else {
          if (iliilIlI === 2) return IIl1IIi1[1];else {
            const l11l11i = [];
            for (let i1liIiII = 1; i1liIiII < iliilIlI; i1liIiII++) {
              l11l11i.push(IIl1IIi1[i1liIiII]);
            }
            return l11l11i;
          }
        }
      }
    }
    return "";
  }
  static ["getActivityId"](llliIl1l = this.activity.activityUrl) {
    const l1I1lIiI = new URLSearchParams(new URL(llliIl1l).search),
      IIiIIlli = ["activityId", "giftId", "actId", "code", "a", "id", "token"];
    let l1il11II = "";
    for (let lIIIlliI of IIiIIlli) {
      l1il11II = l1I1lIiI.get(lIIIlliI);
      if (l1il11II) break;
    }
    return !l1il11II && (l1il11II = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, llliIl1l)), this.activity.activityId = l1il11II, this.activity.activityId;
  }
  static ["getQueryString"](i1I1II1i, IlIIIliI) {
    let i1iiIll1 = new RegExp("(^|[&?])" + IlIIIliI + "=([^&]*)(&|$)"),
      lliIl11i = i1I1II1i.match(i1iiIll1);
    if (lliIl11i != null) return unescape(lliIl11i[2]);
    return "";
  }
  static async ["runActInfo"]() {
    let I1ili1i = {};
    if (this.activity.activityUrl) {
      I1ili1i.domain = this.activity.activityUrl.match(/^(?:https?:\/\/)?([^/]+)\//)[1];
      I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "activityId");
      I1ili1i.prefix = Object.keys(iI111l1i.urlPrefixes).find(illll1 => this.activity.activityUrl.match(iI111l1i.urlPrefixes[illll1])) || "";
      if (/yq-hd-rc/.test(this.activity.activityUrl)) I1ili1i.mode = "yqhd", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "activityId");else {
        if (/interaction\/v2/.test(this.activity.activityUrl)) {
          I1ili1i.mode = "v2";
          let liiIli1l = this.activity.activityUrl.match(/\/v2\/(\d+)\/(\d+)\//);
          I1ili1i.activityType = liiIli1l[1];
          I1ili1i.shopId = this.activity.activityUrl.match(/shopId=(\d+)/)[1];
          I1ili1i.templateCode = liiIli1l[2];
        } else {
          if (/activityType=\d+/.test(this.activity.activityUrl)) I1ili1i.mode = "100", I1ili1i.activityType = this.activity.activityUrl.match(/activityType=([^&]+)/)[1];else {
            if (/(hdb|jingyun)/.test(this.activity.activityUrl)) I1ili1i.mode = "hdb", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "id"), I1ili1i.userId = this.getQueryString(this.activity.activityUrl, "userId");else {
              if (/jinggeng/.test(this.activity.activityUrl)) I1ili1i.mode = "jinggeng", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "id"), I1ili1i.userId = this.getQueryString(this.activity.activityUrl, "user_id");else {
                if (/gzsl/.test(this.activity.activityUrl)) I1ili1i.mode = "gzsl", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "activityId");else {
                  if (/hzbz-isv|hdds-isv/.test(this.activity.activityUrl)) I1ili1i.mode = "hzbz", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "id");else /txzj-isv/.test(this.activity.activityUrl) ? (I1ili1i.mode = "txzj", I1ili1i.activityId = this.getQueryString(this.activity.activityUrl, "a")) : I1ili1i.mode = "wx";
                }
              }
            }
          }
        }
      }
      I1ili1i.needPinToken = !iIl1IlI1.notInitPinTokenRegx.test(this.activity.activityUrl);
      I1ili1i.activityId = this.getActivityId();
      I1ili1i.activityUrl = this.activity.activityUrl;
      if (IlIIlIli.redis) I1ili1i.activityId && (await IlIIlIli.redis.sismember("activity_stop", I1ili1i.activityId)) && (this.log("hit cache,stop"), process.exit(0));else {
        let llI1ll1I = this.readFileSync("cache/stop/id");
        I1ili1i.activityId && llI1ll1I.includes(I1ili1i.activityId) && (this.log("hit cache,stop"), process.exit(0));
      }
    }
    this.activity = Object.assign(this.activity, I1ili1i);
  }
  static ["envCheck"](iIiiI1ll = {}) {
    console.log("当前版本:v" + this.envInfo.version + ",依赖版本:v" + this.version);
    const IiIIlIl = require.main.filename,
      IIIl111i = IiIIlIl.match(/[^\\\/]+(?=\.\w+$)/)[0],
      IlliIilI = llillIi1.parse(this.readFileSync("./config/config.yaml")) || {},
      IlIl1I1l = Object.assign({}, iIl1IlI1, iI111l1i),
      IlliIiiI = Object.assign({}, iiIll1i, iIliIIII),
      IIl1li11 = IIiIi => IlliIilI[IIIl111i + "_" + IIiIi] ?? IlliIilI[IIiIi] ?? process.env[IIIl111i + "_" + IIiIi] ?? IlIl1I1l[IlliIiiI[IIiIi].replace(/^__|__$/g, "")];
    for (let IillIlII in iiIll1i) {
      let i1lIIlI = IIl1li11(IillIlII),
        IIi1illl = iiIll1i[IillIlII].replace(/^__|__$/g, "");
      if (/^__.*__$/.test(iiIll1i[IillIlII]) && typeof i1lIIlI === "string") {
        i1lIIlI.split(/[@,&|]/).forEach(lililIii => iIl1IlI1[IIi1illl].push(lililIii));
        continue;
      }
      if (/^__(?!_)/.test(iiIll1i[IillIlII]) && typeof i1lIIlI === "string") {
        i1lIIlI.split(/[@,&|]/).forEach(iIIIiI11 => iIl1IlI1[IIi1illl].push(iIIIiI11.includes("-") ? iIIIiI11 : iIIIiI11 * 1));
        continue;
      }
      iIl1IlI1[IIi1illl] = typeof iIl1IlI1[IIi1illl] === "number" ? parseInt(i1lIIlI) : i1lIIlI;
    }
    for (let il1Il1I1 in iIliIIII) {
      let i11il1ii = IIl1li11(il1Il1I1),
        ill1I1I = iIliIIII[il1Il1I1].replace(/^__|__$/g, "");
      iI111l1i[iIliIIII[il1Il1I1]] = typeof iI111l1i[ill1I1I] === "number" ? parseInt(i11il1ii) : i11il1ii;
    }
    iIiiI1ll.thread = parseInt(IlliIilI[IIIl111i + "_B_THREAD"] ?? IlliIilI.B_THREAD ?? process.env[IIIl111i + "_B_THREAD"] ?? process.env.B_THREAD ?? iIiiI1ll?.["thread"] ?? 1);
    iIiiI1ll.main_thread = parseInt(IlliIilI[IIIl111i + "_B_MAIN_THREAD"] ?? IlliIilI.B_MAIN_THREAD ?? process.env[IIIl111i + "_B_MAIN_THREAD"] ?? process.env.B_MAIN_THREAD ?? iIiiI1ll?.["main_thread"] ?? 1);
    iIiiI1ll.inviteTask && (iIiiI1ll.main_thread = parseInt(IlliIilI[IIIl111i + "_B_INVITE_MAIN_THREAD"] ?? IlliIilI.B_INVITE_MAIN_THREAD ?? process.env[IIIl111i + "_B_INVITE_MAIN_THREAD"] ?? process.env.B_INVITE_MAIN_THREAD ?? 1));
    if (iIl1IlI1.leaderNum) iIiiI1ll.main_thread = Math.min(iIiiI1ll.main_thread, iIl1IlI1.leaderNum);
    iIl1IlI1.wxProxyCheck = iIiiI1ll?.["wxProxyCheck"] ?? iIl1IlI1.wxProxyCheck;
    iIl1IlI1.wxProxySmart = iIiiI1ll?.["wxProxySmart"] ?? iIl1IlI1.wxProxySmart;
    console.log("当前token B_API_TOKEN=\"" + iI111l1i.apiToken + "\"");
    console.log("运行参数：", iIiiI1ll);
    console.log(Iii1iI1i.envInfo.name, IiIIlIl, "开始运行...");
    IlIIlIli.addressList = JSON.parse(this.readFileSync("./account.json") || "[]");
    iIl1IlI1.logger = new liiIIll({
      "level": iI111l1i.mode || iI111l1i.showDebugInfo === 1 ? "debug" : "info",
      "filename": IIIl111i + "/" + i1I1IlI1(Date.now(), "yyyy-MM-dd_HH-mm-ss-SSS"),
      "logToFile": iIl1IlI1.logToFile === 1
    });
    ilIiilII.setMaxListeners(iIiiI1ll.main_thread);
  }
  static async ["redis"]() {
    if (iIl1IlI1.redisCacheEnable === 2) return;
    if (iIl1IlI1.redisRequire === 2) {
      this.log("redis依赖未安装,禁用");
      return;
    }
    if (!iIl1IlI1.redisUrl) {
      this.log("未配置redis变量,禁用");
      return;
    }
    try {
      let ll1lii11 = iIl1IlI1.redisUrl.split("/"),
        iilIliil = ll1lii11[0].split(":"),
        iIll1II = new I11I1l1I({
          "host": iilIliil[0],
          "port": iilIliil[1],
          "password": ll1lii11[1],
          "db": ll1lii11[2]
        });
      await iIll1II.connected;
      if (iIl1IlI1.redisConnect === 2) {
        this.log("redis连接失败,禁用");
        IlIIlIli.redis = null;
        return;
      }
      this.log("启用redis缓存");
      IlIIlIli.redis = iIll1II;
    } catch (l1IilIi) {
      console.log(l1IilIi);
    }
  }
  static async ["checkSendFiexd"]() {
    if (iI111l1i.wxScheduledNotify === 2 && iI111l1i.scheduleTgBotToken && iI111l1i.scheduleTgUserId) {
      IlIIlIli.activity.noStart && IlIIlIli.activity.startTime && !(await IlIIlIli?.["redis"]?.["sismember"]("activity_corn", this.activity.activityId)) && (IlIIlIli.activity.sendStartFiexd = true);
      IlIIlIli.activity.noDraw && IlIIlIli.activity.drawTime && !(await IlIIlIli?.["redis"]?.["sismember"]("activity_draw_corn", this.activity.activityId)) && (IlIIlIli.activity.sendDrawFiexd = true);
    }
  }
  static async ["checkWriteToRedis"](i1ilIIl1, I11ll1ii) {
    i1ilIIl1.includes("spy定时") && (await IlIIlIli?.["redis"]?.["sadd"](I11ll1ii === 0 ? "activity_corn" : "activity_draw_corn", this.activity.activityId));
  }
  static async ["run"](ll1lili1) {
    this.runBefore();
    this.envCheck(ll1lili1);
    this.activity.activityUrl && console.log("活动链接：", this.activity.activityUrl);
    let iI1iil = this.cookieInit(),
      IiIillI = iI1iil[0],
      illIlII = iI1iil[1];
    console.log("原始ck长度", IiIillI.length);
    const iii1iI11 = iIl1IlI1.wxWhitelist?.["length"] > 0 ? iIl1IlI1.wxWhitelist : ll1lili1?.["whitelist"],
      iiI11Iil = new Set(this.__as(iii1iI11).map(IiiI1i1l => IiiI1i1l - 1));
    IiIillI = IiIillI.filter((I1lIilll, lIllilIi) => iiI11Iil.has(lIllilIi));
    console.log("设置白名单后ck长度", IiIillI.length);
    try {
      if (iIl1IlI1.wxBlockRegx) {
        const II1Il1l1 = iIl1IlI1.wxBlockRegx.split(";").map(III1I1i => {
            const [lI1l11li, l1lIilIl] = III1I1i.split("@"),
              lII1Ii1i = l1lIilIl.split("|");
            return {
              "regx": new RegExp(lI1l11li),
              "blist": lII1Ii1i
            };
          }),
          IilIll11 = this.activity?.["activityUrl"];
        IiIillI = IiIillI.filter(I1iIiIII => {
          for (const {
            regx: I11i1iIl,
            blist: ll1IIi1I
          } of II1Il1l1) {
            if (I11i1iIl.test(IilIll11) && ll1IIi1I.some(lI1Ilil1 => I1iIiIII.includes(lI1Ilil1))) return false;
          }
          return true;
        });
      }
    } catch (Illli1iI) {
      this.log("排除黑名单Error", Illli1iI);
    }
    console.log("排除PIN黑名单后ck长度", IiIillI.length);
    this.cookies = IiIillI;
    this.cookieLength = IiIillI.length;
    this.inviteCookieLength = illIlII.length;
    this.paddedStringEndCount = String(this.cookieLength).length;
    if (this.cookieLength === 0) return this.log("没有可运行的ck");
    await this.#au();
    this.#overwriteConfig(ll1lili1);
    await this.redis();
    await this.runActInfo();
    this.proxy = new lI1l11l1(this.activity.activityUrl);
    if (iIl1IlI1.wxProxyEnable === 2 && iIl1IlI1.wxProxySmart === 2) {
      if (this.proxy.subscriptionUrls.length === 0) return this.log("没有可用的代理");
      this.proxy.updateProxyEnable(true);
    }
    this.taskManager = new iIIIili1([...this.cookies, ...illIlII], this.TaskClass);
    const liI1illi = Date.now();
    try {
      if (iI111l1i.wxRunMode === 1 && !ll1lili1?.["inviteTask"]) try {
        await this.get_mains_obj().userTask();
      } catch (lIiliIiI) {
        if (lIiliIiI instanceof i1I1IiII) this.running = false;else {
          if (lIiliIiI instanceof iiiIIIll) {} else {
            this.log(lIiliIiI.message || lIiliIiI);
          }
        }
      }
      const I111IiIl = [];
      for (let llllliil = 0; llllliil < Math.min(this.taskManager.cookie_all_obj.length, ll1lili1?.["main_thread"] || 1); llllliil++) {
        I111IiIl.push(() => this.async_thread(llllliil, ll1lili1));
      }
      let IlliI111 = ll1lili1?.["enableDynamic"] || false;
      IlliI111 && (this.concurrencyLimit = ll1lili1?.["main_thread"] || 1);
      await this.runTasksConcurrentlyWithDelay(I111IiIl, ll1lili1?.["main_thread"] || 1, 10, IlliI111);
    } catch (iI1l11l1) {
      iI1l11l1 instanceof i1I1IiII && (this.running = false);
    }
    const II1ii1i1 = Date.now(),
      iIiliiiI = (Math.abs(II1ii1i1 - liI1illi) / 1000).toFixed(2);
    console.log("" + Iii1iI1i.envInfo.name, "运行结束,耗时" + (II1ii1i1 - liI1illi) + "ms");
    await this.checkSendFiexd();
    const ll1111I = [() => this.notify(iIiliiiI, ll1lili1), ...this.sendTimeNotify(), ...this.sendNotifyToUser()];
    await this.runTasksConcurrentlyWithDelay(ll1111I, ll1111I.length, 10, false, false);
    process.exit(0);
  }
  static ["runBefore"]() {}
}
process.on("uncaughtException", lI1IiIl1 => {
  console.error("未捕获的异常:", lI1IiIl1);
});
module.exports = {
  "UserMode": IlIIlIli,
  "RunMode": Iii1iI1i,
  "CryptoJS": II11il11,
  "baseCommonEnv": iIl1IlI1,
  "baseCommonEnvKey": iiIll1i
};