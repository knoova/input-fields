
export function objInput<T extends Object>() {
   

    return { }
}




// function builder<T>(inputDesc: core.InputArgs<T>): core.Input<T> {
//     switch (inputDesc.type) {
//         case "string":
//             return input.string.stringInput({ ...inputDesc });
//         case "password":
//             return input.string.stringInput({ ...inputDesc, password: true });
//         // case "mail":
//         //     return;
//         case "boolean":
//             return input.boolean.booleanInput({...inputDesc});
//         // case "radio":
//         //     return;
//         // case "upload":
//         //     return;
//     }
// }