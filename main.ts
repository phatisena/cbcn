
//%block="CharacterNumber"
//%color="#e8436f"
//%icon="\uf187"
namespace cbcn {

    let cidk:{[key:string]:number} = {};let cix = 0; let tmpNumTxt = "0123456789";

      let anmt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      
      export enum bigBase { 
          //%block="base10 decimal"
          b10 = 10,
          //%block="base13"
          b13 = 13,
          //%block="base20"
          b20 = 20,
          //%block="base16 hexadecimal"
          b16 = 16,
          //%block="base32"
          b32 = 32,
          //%block="base36"
          b36 = 36
      }
      
    //%block="$name"
    //%blockId=cbcn_indexKeyShadow
    //%blockHidden=true shim=TD_ID
    //%name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //%name.fieldOptions.key="cbcnIndexKey"
    export function _indexKeyShadow(name: string) {
        return name
    }

        function decEncode(nvl: number, bvl: number, dvl: number): string {
            let sti = ""
            let ani = nvl
            if (ani > 0) {
                while (ani > 0) {
                    sti = "" + anmt.charAt(ani % bvl) + sti
                    ani = Math.floor(ani / bvl)
                }
            } else {
                sti = anmt.charAt(0)
            }
            if (dvl <= 0) {
                return sti
            }
            if (dvl - sti.length > 0) {
                while (dvl - sti.length > 0) {
                    sti = "" + anmt.charAt(0) + sti
                }
            }
            return sti
        }

        function decDecode(tvl: string, bvl: number): number {
            let stl = tvl.length
            let vld = 0
            let nvl = 0
            let vix = 0
            for (let nix = stl - 1; nix >= 0; nix--) {
                vix = anmt.indexOf(tvl.charAt(nix))
                if (vld == 0) {
                    nvl += vix
                    vld = bvl
                } else {
                    nvl += vix * vld
                    vld = vld * bvl
                }
            }
            return nvl
        }

    function checkNumTxt(txt: string) {
        for (let ti = 0; ti < txt.length; ti++){
            if (!(tmpNumTxt.includes(txt.charAt(ti)))) { return false}
        }
        return true
    }

    //%blockid=cbcn_encode
    //%block="Encode $input to cbcn"
    //%group="classic cbcn"
    //%weight=10
    export function encode(input: string) {
        let output = ""; let ct = ""; let cl = 0; let cn = 0;
        for (let sti = 0; sti < input.length; sti++) {
            cn = input.charCodeAt(sti); ct = cn.toString(); cl = ct.length;
            output = "" + output + cl.toString() + cn.toString()
        }
        output = "" + output + "0"; console.log(output);
        return output
    }

    //%blockid=cbcn_startidx
    //%block="start decode to $name by $start"
    //%name.shadow=cbcn_indexKeyShadow
    //%group="cbcn index key"
    //%weight=5
    export function startIndex(name: string,start: number) {
        cidk[name] = start; console.logValue(name,cidk[name]);
    }

    //%blockid=cbcn_decode
    //%block="Decode $input with idx key $name"
    //%name.shadow=cbcn_indexKeyShadow
    //%group="classic cbcn"
    //%weight=5
    export function decode(input: string,name: string) {
        if (!(checkNumTxt(input))) return "";
        if (!(cidk[name])) return "";
        let output = "", ct = ""; let cl = 0, cn = 0,cix = cidk[name];
        while (cix < input.length) {
            cl = parseInt(input.charAt(cix)); ct = "";
            for (let ci = 0; ci < cl; ci++) {
                ct = "" + ct + input.charAt(cix + (ci + 1))
            }
            cix += cl + 1; cn = parseInt(ct);
            output = "" + output + String.fromCharCode(cn)
            if ("0".includes(input.charAt(cix))) { break }
        }
        console.log(output); cix += 1, cidk[name] = cix;
        return output
    }

}