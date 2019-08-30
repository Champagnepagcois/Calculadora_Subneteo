const index = (req, res) => {
    res.render('index');
}

const calculate = (req, res) => {
    const { ip, mask, host, subred } = req.body;
    var ipInt = StringToIP(ip);
    console.log('IP en Binario: ', IPToBinary(ipInt));
    console.log('Clase de IP: ', IPClass(ipInt));
    console.log('IP privada: ', IsPrivate(ipInt));
    console.log('Mascara de Red por CIDR: ', IPToString(BinaryToIP(StringToIP(CIDRToNetmask(mask)))));
    console.log('Máscara Ampliada con subredes: ', IPToString(StringToIP(NextNetmaskBySubnet(PowerToInt(subred), StringToIP(IPToBinary(StringToIP(mask)))))));
    console.log('Host por subred', HostBySubnet(NextNetmaskBySubnet(PowerToInt(nSubnet), StringToIP(IPToBinary(StringToIP(mask))))));
    console.log('Máscara Ampliada con hosts: ', IPToString(StringToIP(NextNetmaskByHosts(host))));
    console.log('Número de subredes: ', SubnetsByHosts(StringToIP(NextNetmaskByHosts(host))));
    console.log('Broadcast: ', GetBroadcast(ipsInt, StringToIP(mask)));

    res.redirect('/');
}

/**
 * Retorna una dirección IP o máscara
 * @param {String} ip 
 * @returns[0] = Primer dígito de la dirección IP
 * @returns[1] = Segundo dígito de la dirección IP
 * @returns[2] = Primer dígito de la dirección IP
 * @returns[3] = Primer dígito de la dirección IP
 */
function StringToIP(ip) {
    const ipAddressString = ip.split('.');
    var ipInt = [];
    for (let i = 0; i < ipAddressString.length; i++) {
        ipInt[i] = parseInt(ipAddressString[i]);
    }
    return ipInt;
}

/**
 * Devuelve la dirección IP en String
 * @param {StringToIP} ip Dirección IP o Máscara
 */
function IPToString(ip) {
    return ip[0] + '.' + ip[1] + '.' + ip[2] + '.' + ip[3] + '.';
}

/**
 * Obtiene la clase de una IP
 * @param {StringToIP} ipInt 
 * @returns A = IP de clase A
 * @returns B = IP de clase B
 * @returns C = IP de clase C
 * @returns D = IP de clase D
 * @returns E = IP de clase E
 */
function IPClass(ipInt) {
    //Clase A
    if (ipInt[0] >= 0 && ipInt[0] < 128) return 'A';
    // Clase B
    if (ipInt[0] >= 128 && ipInt[0] < 192) return 'B';
    // Clase C
    if (ipInt[0] >= 192 && ipInt[0] < 224) return 'C';
    // Clase D
    if (ipInt[0] >= 224 && ipInt[0] < 240) return 'D';
    // Clase E
    if (ipInt[0] >= 240 && ipInt[0] < 248) return 'E';
}

/**
 * Convierte una IP o máscara a binario
 * @param {StringToIP} ipInt 
 * @returns IP en binario
 */
function IPToBinary (ipInt) {
    var numBinary = '';
    var binaryIP = '';
    for (let i = 0; i < ipsInt.length; i++) {
        if (ipInt[i].toString(2).length != 8) {
            numBinary = ipsInt[i].toString(2)
            while (numBinary.length != 8) {
                numBinary = '0' + numBinary;
            }
            binaryIP += numBinary + '.';
        } else {
            binaryIP += ipInt[i].toString(2) + '.';
        }
    }
    binaryIP = binaryIP.substring(0, binaryIP.length - 1);
    return binaryIP;
}

/**
 * Convierte una IP o máscara de red en binario a una IP en decimal
 * @param {StringToIP} binaryIP 
 * @returns IP en decimal
 */
function BinaryToIP(binaryIP) {
    var ip = [];
    for (let i = 0; i < binaryIP.length; i++) {
        ip[i] = parseInt(binaryIP[i], 2);
    }
    return ip
}

/**
 * Obtiene la máscara en binario a partir del CIDR
 * @param {StringToIP} cidr CIDR de la máscara de red
 * @returns Máscara de red en binario
 */
function CIDRToNetmask(cidr) {
    var binaryNetmask = '';
    for (let i = 0; i < cidr; i++) {
        if (i%8 == 0 && i < 32 && i != 0) {
            binaryNetmask += '.';
        }
        binaryNetmask += '1';
    }
    for (let i = binaryNetmask.length; binaryNetmask.length != 35; i++) {
        if (i == 8 || i == 17 || i == 26) {
            binaryNetmask += '.';
        }
        binaryNetmask += '0';
    }
    return binaryNetmask;
}

/**
 * Calcula si la dirección IP es de tipo privada o pública
 * @param {StringToIP} ip Dirección IP
 * @returns true == IP de tipo privada
 * @returns true == IP de tipo pública
 */
function IsPrivate(ip) {
    if (ip[0] == 10) {
        return true;
    }
    if (ip[0] == 172 && ipA[1] >= 16 && ip <=31) {
        return true;
    }
    if (ip[0] == 192 && ip[1] == 168){
        return true;
    }
    return false;
}

/**
 * Calcula la potencia para obtener las subredes requeridas
 * @param {int} n Número de subredes a crear
 * @returns Potencia para subredes
 */
function PowerToInt(n) {
    var i = 1;
    var p = 1;
    while (i < n && p < 32) {
        p++;
        i = Math.pow(2, p);
    }
    return p;
}

/**
 * Calcula la máscara de red ampliada
 * @param {int} p Número retornado por PowerToInt
 * @param {StringToIP} mask Número en binario
 * @returns Máscara de red en binario
 */
function NextNetmaskBySubnet(p, mask) {
    var count = '';
    var nextNetmask = '';
    let j = 0
    for (let i = 0; i < netmask.length; i++) {
        if (parseInt(mask[i], 2) != 255 && j == 0) {
            for (; p > 0; p--) {
                count += '1';
                if (count.length == 8 && p != 1) {
                    nextNetmask += count + '.';
                    count = '';
                    i++;
                }
            }
            while (count.length != 8) {
                count += '0';
            }
            nextNetmask += count + '.';
            count = '';
        } else {
            if (parseInt(mask[i], 2) == 0) {
                for (let k = 0; k != 8; k++) {
                    nextNetmask += '0';
                }
                nextNetmask += '.';
            } else {
                nextNetmask += mask[i].toString() + '.';
            }
        }
    }
    nextNetmask = nextNetmask.substring(0, nextNetmask.length - 1);
    return nextNetmask;
}

/**
 * Saca la máscara de red ampliada por número de hosts
 * @param {int} hosts Número de hosts requeridos
 * @returns Máscara en binario
 */
function NextNetmaskByHosts(host) {
    var num = parseInt(host) + 2;
    var n = Math.log2(num);
    n = Math.ceil(n);
    var netmask = '';
    for (let i = 0; i < (32 - n); i++) {
        if (netmask.length == 8 || netmask.length == 17 || netmask.length == 26) {
            netmask += '.';
            i = i - 1;
        } else {
            netmask += '1';
        }
    }
    while (netmask.length != 35) {
        if (netmask.length == 8 || netmask.length == 17 || netmask.length == 26) {
            netmask += '.';
        } else {
            netmask += '0';
        }
    }

    return netmask;
}

/**
 * Calcula el número de hosts por subred
 * @param {String} mask Máscara de red en binario
 * @returns Número de hosts
 */
function HostBySubnet(mask) {
    var count = 0;
    var hosts = 0;
    for (let i = 0; i < mask.length; i++) {
        if (mask.charAt(i) == '0') {
            count++;
        }
    }
    hosts = Math.pow(2, count) - 2;
    return hosts;
}

/**
 * Retorna el número de subredes de una máscara ampliada
 * @param {StringToIP} netmask Máscara de red ampliada en binario
 * @returns Número de subredes
 */
function SubnetsByHosts(mask) {
    var count = 0;
    var subnets = 0;
    for (let i = 0; i < mask.length; i++) {
        for (let j = 0; j < mask[i].toString().length; j++) {
            if (mask[i].toString().charAt(j) == '1') {
                count++;
            }
            if (count == 8) {
                count = 0;
            }
        }
    }
    subnets = Math.pow(2, count);
    return subnets;
}

/**
 * Retorna la dirección broadcast de una IP y máscara
 * @param {StringToInt} ip Dirección IP
 * @param {StringToInt} mask Máscara de red
 * @returns Broadcast
 */
function GetBroadcast(ip, mask) {
    var broadcast = [];
    var count = 0;
    var n = 0;
    console.log(ip);
    console.log(mask);
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] == 255) {
            broadcast[i] = ip[i];
        }
        if (mask[i] == 0) {
            broadcast[i] = 255;
        }
        if (mask[i] != 0 && mask[i] != 255) {
            count = 256 - mask[i];
            while (n < ip[i]) {
                n += count;
            }
            n--;
            broadcast[i] = n;
        }
    }
    return broadcast;
}

module.exports = {
    index,
    calculate
};