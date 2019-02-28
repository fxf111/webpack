const mixin = {
    filters: {
        //保留数据小数点后N位
        //num：要处理的数字；fix：保留的小数点位数
        toFixed(num, fix) {
            num = isNaN(num) ? 0 : num;
            return parseFloat(num).toFixed(fix);
        },
        /**
         * 如果数字超过最大值，显示特定的文字，例如99+
         * @param {Number, String} num    ：要处理的数字
         * @param {Number, String} maxNum ：最大值
         */
        maxNumStr(num, maxNum) {
            if(num > maxNum) {
                return maxNum + '+';
            }
            return num;
        }
    },

    methods: {
        /**
         * 根据起始数字、结束数字，总时间和已经经过时间，返回当前应该显示的数字
         * @param {Number} startNum 起始数字
         * @param {Number} endNum 结束数字
         * @param {Number} totalTime 总时间
         * @param {Number} remainTime 已经持续时间
         * @param {Number} fix 要保留小数位数
         */
        numUpdate(startNum, endNum, totalTime, remainTime, fix = 0) {
            let s = parseFloat(startNum),
                e = parseFloat(endNum),
                t = parseFloat(totalTime),
                r = parseFloat(remainTime);
            return (s + (e-s)/totalTime * r).toFixed(fix);
        },
    }
};

export default mixin;