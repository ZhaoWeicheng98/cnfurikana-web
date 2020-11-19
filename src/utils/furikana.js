let pinyin = require("pinyin");
let cnchar = require("cnchar");
let funikanaData = require("./table.json");

function getChinese(strValue) {
  if (strValue != null && strValue != "") {
    var reg = /[\u4e00-\u9fa5]/g;
    let ret = strValue.match(reg);
    if (ret != null && ret != "") {
      return ret.join("");
    }
  } else return "";
}

export function ToParsedContent(text) {
  const arrowTones = [
    "\u3000\u3000",
    "→\u3000",
    "↗\u3000",
    "↘↗",
    "↘\u3000",
    "·\u3000",
  ];
  let hanziContent = getChinese(text);
  let pinyinContent = pinyin(hanziContent, {
    segment: true,
  });
  let retContent = [];
  for (let i = 0; i < hanziContent.length; i++) {
    let tonePinyin = pinyinContent[i][0];
    let spellInfo = cnchar.spellInfo(tonePinyin);
    let untonePinyin = spellInfo.spell;
    let tone = spellInfo.tone;
    retContent.push({
      hanzi: hanziContent[i],
      tonePinyin: tonePinyin,
      untonePinyin: untonePinyin,
      tone: tone,
      arrowTone: arrowTones[tone],
      funikana: funikanaData[untonePinyin],
    });
  }
  return retContent;
}

export function ToHtmlContent(parsedContent, displayMode = 0) {
  // displayMode:
  // 0 标注片假名和箭头音调
  // 1 标注片假名
  // 2 标注有音调拼音
  // 3 标注无音调拼音
  let retContents = [];
  for (let i = 0; i < parsedContent.length; i++) {
    let parsedHanzi = parsedContent[i];
    let content = parsedHanzi.hanzi;
    switch (displayMode) {
      case 0:
        content =
          "<ruby>" +
          content +
          "<rp>(</rp><rt>" +
          parsedHanzi.funikana +
          "</rt><rp>)</rp></ruby><rp>(</rp><rt>" +
          parsedHanzi.arrowTone +
          "</rt><rp>)</rp>";
        break;
      case 1:
        content =
          content + "<rp>(</rp><rt>" + parsedHanzi.funikana + "</rt><rp>)</rp>";
        break;
      case 2:
        content =
          content +
          "<rp>(</rp><rt>" +
          parsedHanzi.tonePinyin +
          "</rt><rp>)</rp>";
        break;
      case 3:
        content =
          content +
          "<rp>(</rp><rt>" +
          parsedHanzi.untonePinyin +
          "</rt><rp>)</rp>";
        break;
      default:
        console.log("mode error!");
        break;
    }
    retContents.push(content);
  }
  return "<ruby>" + retContents.join("") + "</ruby>";
}
