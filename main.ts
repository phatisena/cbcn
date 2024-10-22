//%color=#e8436f
//%icon="\uf187"
namespace cbcn {

    let cix = 0; let tmpNumTxt = "0123456789";

    export function CbcnCheckNumTxt(txt: string) {
        for (let ti = 0; ti < txt.length; ti++){
            if (!(tmpNumTxt.includes(txt.charAt(ti)))) { return false}
        }
        return true
    }

    //%blockid=cbcn_encode
    //%block="Encode $input to cbcn"
    //%group="main cbcn"
    export function CbcnEncode(input: string) {
        let output = ""; let ct = ""; let cl = 0; let cn = 0;
        for (let sti = 0; sti < input.length; sti++) {
            cn = input.charCodeAt(sti); ct = cn.toString(); cl = ct.length;
            output = "" + output + cl.toString() + cn.toString()
        }
        output = "" + output + "0"; console.log(output);
        return output
    }

    //%blockid=cbcn_startidx
    //%block="starting decode $start"
    //%group="main cbcn"
    export function CbcnStartIndex(start: number) {
        cix = start; console.log(cix.toString());
    }

    //%blockid=cbcn_decode
    //%block="Decode $input from cbcn str"
    //%group="main cbcn"
    export function CbcnDecode(input: string) {
        if (!(CbcnCheckNumTxt(input))) { return "" }
        let output = ""; let cl = 0; let cn = 0; let ct = "";
        while (cix < input.length) {
            cl = parseInt(input.charAt(cix)); ct = "";
            for (let ci = 0; ci < cl; ci++) {
                ct = "" + ct + input.charAt(cix + (ci + 1))
            }
            cix += cl + 1; cn = parseInt(ct);
            output = "" + output + String.fromCharCode(cn)
            if ("0".includes(input.charAt(cix))) { break }
        }
        console.log(output); cix += 1;
        return output
    }

}