const Excel = require('exceljs');
const Banking = require('banking');
const _ = require("lodash");

const readAll = (object, rowHeader, rowValue, rows) => {
    for(let attr in object){
        let header = object[attr];
        if (_.isArray(header)){
            let rowHeaderArr = [];
            let rowsTemp = [];
            for(let item of header){
                let rowValueArr = [];
                readAll(item, rowHeaderArr, rowValueArr);
                rowsTemp.push(rowValueArr);
            }
            rows.push(rowHeaderArr);
            for(let item of rowsTemp){
                rows.push(item);
            }
        }else if(_.isObject(header)){
            readAll(header, rowHeader, rowValue, rows);
        }else {
            if(rowHeader.indexOf(attr) == -1){
                rowHeader.push(attr);
            }
            if(Number(header)){
                rowValue.push(Number(header));
            }else{
                rowValue.push(header);
            }
        }
    }
}

const convertOfx2xls = (request, response) => {
    var file = JSON.parse(JSON.stringify(request.files))
    var file_name = file.file.name

    //if you want just the buffer format you can use it
    var buffer = new Buffer.from(file.file.data.data)
    var bufferString = buffer.toString('latin1');
  
    Banking.parse(bufferString, (res) => {
        let rowHeaderSigno = [];
        let rowValueSigno = [];
        readAll(res.body.OFX.SIGNONMSGSRSV1, rowHeaderSigno, rowValueSigno);

        let rowHeaderBank = [];
        let rowValueBank = [];
        let rowsValueBank = [];
        readAll(res.body.OFX.BANKMSGSRSV1, rowHeaderBank, rowValueBank, rowsValueBank);

        response.writeHead(200, {
        'Content-Disposition': `attachment; filename="${file_name}.xlsx"`,
        'Transfer-Encoding': 'chunked',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        var workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: response })
        
        // Create workbook & add worksheet
        const worksheet = workbook.addWorksheet('Extrato');
        
        worksheet.addRow(rowHeaderSigno).commit();
        worksheet.addRow(rowValueSigno).commit();
        worksheet.addRow([""]).commit();
        worksheet.addRow(rowHeaderBank).commit();
        worksheet.addRow(rowValueBank).commit();
        worksheet.addRow([""]).commit();
        for(let item of rowsValueBank){
            worksheet.addRow(item).commit();
        }
        worksheet.commit()
        workbook.commit()
    });
}

module.exports = {
    convertOfx2xls
}