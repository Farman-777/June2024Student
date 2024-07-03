const FormUtil = {
    data: (formName) => {
        const form = document.getElementsByName(formName)[0];
        const data = new FormData(form);
        return Object.fromEntries(data);
    },

    dataWithTables: (formName) => {
        const form = document.getElementsByName(formName)[0];
        const data = new FormData(form);
        const values = Object.fromEntries(data);
        var finalObject = {};

        // var previous='';
        // var previousIndex;
        //     Object.entries(values).map((data) => {

        //         if(data[0].includes("[")){
        //             if(previous !== ''){
        //                 if(previous === data[0].split("[")[0] && previousIndex === parseInt(data[0].split("[")[1].split("]")[0])){
        //                     obj[data[0].split(".")[1]] = data[1]
        //                 }
        //                 else if(previous === data[0].split("[")[0] && previousIndex !== parseInt(data[0].split("[")[1].split("]")[0])){

        //                     previousIndex = parseInt(data[0].split("[")[1].split("]")[0]);
        //                     arr.push(obj);
        //                     obj = {};
        //                     obj[data[0].split(".")[1]] = data[1]
        //                 }
        //                 else{
        //                     previous = data[0].split("[")[0];
        //                     previousIndex = parseInt(data[0].split("[")[1].split("]")[0]);
        //                     arr.push(obj);
        //                     obj = {};
        //                     obj[data[0].split(".")[1]] = data[1]
        //                 }
        //             } 
        //             else{
        //                 previous = data[0].split("[")[0];
        //                 previousIndex = parseInt(data[0].split("[")[1].split("]")[0]);
        //                 obj[data[0].split(".")[1]] = data[1];
        //             }     
        //             //console.log(data[0].split("[")[1].split("]")[0])

        //         }
        //         else{
        //             finalObject[data[0]] = data[1];
        //         }

        //     });
        //         arr.push(obj)     
        //         console.log(arr);





        Object.entries(values).map((data) => {
            const key = data[0], value = data[1];
            if (key.includes("[")) {
                var arrayKey = key.split("[")[0];
                var temp = finalObject[arrayKey];

                if (!temp) {
                    finalObject[arrayKey] = [];
                }

                var index = parseInt(key.split("[")[1].split("]")[0]);

                var obj = finalObject[arrayKey][index];
                if (!obj) {
                    if (key.indexOf(".") !== -1) {
                        obj = {}
                        finalObject[arrayKey][index] = obj;
                    }
                }
                if (key.indexOf(".") !== -1) {
                    finalObject[arrayKey][index][key.split(".")[1]] = value;
                } else {
                    finalObject[arrayKey].push(value);
                }
            }
            else {
                finalObject[key] = value;
            }
        });

        return finalObject;
    },

    dataTablesWithNestedObjects: (formName) => {
        const form = document.getElementsByName(formName)[0];
        const data = new FormData(form);
        const values = Object.fromEntries(data);
        var finalList = [];

        Object.entries(values).map((data) => {
            var isNested = Boolean((data[0].match(/\./g) || []).length > 1);
            
            if (data[0].includes("[")) {
                var index = parseInt(data[0].split("[")[1].split("]")[0]);
                var obj = finalList[index];
                if (!obj) {
                    obj = {}
                    finalList[index] = obj;
                }
                if (!isNested) {
                    finalList[index][data[0].split(".")[1]] = data[1];
                }
                else {
                    var nestedKey = data[0].split(".")[1].split(".")[0]
                    var nestedObjKey = data[0].split(".")[2];
                    if (!finalList[index][nestedKey]) 
                        finalList[index][nestedKey] = {};

                    finalList[index][nestedKey][nestedObjKey] = data[1];
                }
            }
        });

        return finalList;
    },
}

export default FormUtil;