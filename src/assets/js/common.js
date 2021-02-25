// 时间戳 => yyyy-MM-dd hh:mm:ss
import de from "element-ui/src/locale/lang/de";
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1 + "").padStart(2,"0") + "-" + (this.getDate()+"" ).padStart(2,"0")+ " " + (this.getHours()+"").padStart(2,"0") + ":" + (this.getMinutes()+"").padStart(2,"0") + ":" + (this.getSeconds()+"").padStart(2,"0");
};

let util = {
    /**
     * @param modelValue [Tue Feb 23 2021 10:56:15 GMT+0800 (中国标准时间), Tue Feb 23 2021 11:11:15 GMT+0800 (中国标准时间)]
     * @return duration  {end: "2020-12-14 0956", start: "2020-12-14 0942", step: "MINUTE"}
     * @description 根据起始时间数组modelValue返回duration
     */
    formatStartAndEndTime : function(modelValue) {
        let duration = {};
        // yyyy-MM-dd HH:mm:ss转换为yyyy-MM-dd HH:mm
        if (modelValue == null) {
            return duration;
        }
        let startAndEndTimeArr = [];
        modelValue.forEach(function (item) {
            startAndEndTimeArr.push(item.substring(0, 16));
        });
        let start = new Date(startAndEndTimeArr[0]);
        let end = new Date(startAndEndTimeArr[1]);
        let diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60;

        if (diff >= 0 && diff <= 1) { // step=MINUTE
            // 如果分钟级别展示，则最近一分钟不展示，应为数据为0有歧义
            startAndEndTimeArr[1] = timestamp2Date('yyyy-MM-dd HH:mm', end.getTime() - 1000 * 60);

            start = startAndEndTimeArr[0].replace(':', '');
            end = startAndEndTimeArr[1].replace(':', '');
            duration.step = 'MINUTE';
        } else if (diff >= 0 && diff <= 24) { // step=HOUR
            start = startAndEndTimeArr[0].substring(0, startAndEndTimeArr[0].length - 3);
            end = startAndEndTimeArr[1].substring(0, startAndEndTimeArr[1].length - 3);
            duration.step = 'HOUR';
        } else { // step=DAY
            start = startAndEndTimeArr[0].substring(0, startAndEndTimeArr[0].length - 6);
            end = startAndEndTimeArr[1].substring(0, startAndEndTimeArr[1].length - 6);
            duration.step = 'DAY';
        }

        duration.start = start;
        duration.end = end;
        return duration;
    },
    /**
     * @param modelValue [Tue Feb 23 2021 10:56:15 GMT+0800 (中国标准时间), Tue Feb 23 2021 11:11:15 GMT+0800 (中国标准时间)]
     * @return x轴刻度
     * @description 根据时间组件生成X轴刻度
     */
    initXAxisData(time) {
        // 时间度量
        const durationStep = this.formatStartAndEndTime(time).step;
        // 图X轴刻度计算
        let xAxisData = []; // x轴坐标刻度
        let xStart = new Date(time[0]);
        let xEnd = durationStep === 'MINUTE' ? new Date(new Date(time[1]).getTime() - 1000 * 60) : new Date(time[1]);
        while ((xEnd.getTime() - xStart.getTime()) >= 0) {
            if (durationStep === 'MINUTE') {
                xAxisData.push((xStart.getMonth() + 1) + '-' + xStart.getDate() + ' ' + xStart.getHours() + ':' + xStart.getMinutes());
                xStart = new Date(xStart.getTime() + 1000 * 60);
            } else if (durationStep === 'HOUR') {
                xAxisData.push((xStart.getMonth() + 1) + '-' + xStart.getDate() + ' ' + xStart.getHours());
                xStart = new Date(xStart.getTime() + 1000 * 60 * 60);
            } else {
                xAxisData.push((xStart.getMonth() + 1) + '-' + xStart.getDate());
                xStart = new Date(xStart.getTime() + 1000 * 60 * 60 * 24);
            }
        }
        return xAxisData;
    },

}

/**
 * @param fmt 时间格式
 * @param timestamp 时间戳
 * @returns {*}
 */
const timestamp2Date = function (fmt, timestamp) {
    if (timestamp) {
        var date = new Date(parseInt(timestamp, 10));
    } else {
        return '';
    }
    var o = {
        "M+": date.getMonth() + 1,//月份

        "d+": date.getDate(),//日

        "H+": date.getHours(), //小时

        "h+": date.getHours(),

        "m+": date.getMinutes(),//分

        "s+": date.getSeconds(),//秒

        "q+": Math.floor((date.getMonth() + 3) / 3),//季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

export default util;
