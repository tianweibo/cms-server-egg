const XLSX = require('xlsx');
module.exports = {
	parseInt(string) {
		if (typeof string === 'number') return string;
		if (!string) return string;
		return parseInt(string) || 0;
	},
	excelData(file, headerKeyMap, rwoTransform = row => row) {
		const { filepath } = file;
		const workbook = XLSX.readFile(filepath);
		// 读取内容
		let exceldata = [];
		let arr=[]
		arr[0]=workbook.SheetNames[0]
		arr.forEach(sheet => {
			if (workbook.Sheets.hasOwnProperty(sheet)) {
				const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]).map((row) => {
					const obj = {};
					Object.keys(headerKeyMap).forEach(key => {
						obj[headerKeyMap[key]] = row[key];
					});
					return rwoTransform(obj);
				});
				exceldata = [...exceldata, ...data];
			}
		});
		return exceldata;
	},
	creatUUId(){
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
			'',
			),
			uuid = new Array(36),
			rnd = 0,
			r;
		for (let i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = '-';
			} else if (i == 14) {
				uuid[i] = '4';
			} else {
				if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join('');
    },
	dealMulValue(str,data){
		var temp='';
		if(str){
			var arr=str.split(',');
			for(var i=0;i<arr.length;i++){
				var sj = arr[i].replace(/\s*/g,"");
				temp+=data[sj]+',';
			}
        	temp=temp.substring(0, temp.lastIndexOf(','));
		}
        return temp
    }
}