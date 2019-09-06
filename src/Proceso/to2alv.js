
//const validator = require('validator');
const index = (req, res)=> {
    const binaryIP= '';
    const IpClass = '';
    const netmaskCIDR= '';
    const ipPrivate= '';
    const nextNetmask='';
    const totalSubnets='';
    const subred = '';
    const broadcast='';
    const principal=true;
    const error = false;

    res.render('index', { binaryIP, ipClass, netmaskCIDR, ipPrivate, nextNetmask, totalHosts, totalSubnets, subred, broadcast, principal, error });

}

const calculate = (req, res) => {
    const { ip, cidr, host, nSubnet, radio1, radio2 } = req.body;
    var { mask } = req.body

    var netmaskCIDR = false;
    var nextNetmask = null;
    var totalHosts = null;
    var totalSubnets = null;
    /*

    // Validar campos
    var correctValues = 3;

    if (validator.isIP(ip) && !validator.isEmpty(ip)) {
        correctValues--;
    }
    if (radio1 == 'CIDR') {
        if (!validator.isEmpty(cidr)) {
            if (validator.isInt(cidr, { min: 0, max: 32, allow_leading_zeroes: true })) {
                correctValues--;
            }
        }
    }
    if (radio1 == 'Mask') {
        if (!validator.isEmpty(mask)) {
            if (validator.isIP(mask)) {
                correctValues--;
            }
        }
    }
    if (radio2 == 'Hosts') {
        if (!validator.isEmpty(hosts)) {
            if (validator.isInt(host, { min: 2, max: 4294967294, allow_leading_zeroes: true })) {
                correctValues--;
            }
        }
    }
    if (radio2 == 'Subnets') {
        if (!validator.isEmpty(nSubnet)) {
            if (validator.isInt(nSubnet, { allow_leading_zeroes: true })) {
                correctValues--;
            }
        }
    }

    // Errores
    var principal = true;
    var error = false;

    // Campos correctos
    if (correctValues == 0) {
        // Dirección IP a Binario
        var binaryIP = IPToBinary(StringToIP(ip));
        console.log('Dirección IP a Binario: ', binaryIP);

        // Clase de IP
        var ipClass = IPClass(StringToIP(ip));
        console.log('Clase de IP: ', ipClass);

        // Máscara de Red con CIDR
        if (radio1 == 'CIDR') {
            mask = IPToString(BinaryToIP(StringToIP(CIDRToNetmask(cidr))));
            netmaskCIDR = true;
            console.log('Máscara de Red con CIDR: ', netmaskCIDR);
        }

        // IP Privada
        var ipPrivate = IsPrivate(StringToIP(ip));
        console.log('IP Privada: ', ipPrivate);

        // Nueva Máscara de Red por subredes
        if (radio2 == 'Subnets') {
            nextNetmask = IPToString(BinaryToIP(StringToIP(NextNetmaskBySubnet(PowerToInt(nSubnet), IPToBinary(StringToIP(mask))))));
            console.log('Nueva Máscara de red por subredes: ', nextNetmask);
        }

        // Nueva Máscara de red por hosts
        if (radio2 == 'Hosts') {
            nextNetmask = IPToString(BinaryToIP(StringToIP(NextNetmaskByHosts(host))));
            console.log('Nueva Máscara de red por hosts: ', nextNetmask);
        }

        // Número de hosts por subredes
        if (radio2 == 'Subnets') {
            totalHosts = HostBySubnet(NextNetmaskBySubnet(PowerToInt(nSubnet), IPToBinary(StringToIP(netmask))));
            totalSubnets = nSubnet;
            console.log('Hosts por subredes: ', totalHosts);
        }

        // Número de subredes por hosts
        if (radio2 == 'Hosts') {
            totalSubnets = SubnetsByHosts(IPToBinary(StringToIP(nextNetmask)));
            totalHosts = hosts;
            console.log('Subredes por hosts: ', SubnetsByHosts(StringToIP(nextNetmask)));
        }

        // Subredes requeridas
        const subnetsArray = GetTotalSubnets(StringToIP(ip), mask, nextNetmask);
        var subnets = [];
        for (let i = 0; i < subnetsArray.length; i++) {
            subred[i] = IPToString(subnetsArray[i]);
        }
        console.log('Subredes requeridas: ', subred);

        // Broadcast de subredes
        var broadcast = [];
        for (let i = 0; i < subnetsArray.length; i++) {
            broadcast[i] = IPToString(GetBroadcast(subnetsArray[i], StringToIP(nextNetmask)));
        }
        console.log('Direcciones Broadcast: ', broadcast);

        principal = false;
    } else {
        var binaryIP = '';
        var ipClass = '';
        var netmaskCIDR = '';
        var ipPrivate = '';
        var nextNetmask = '';
        var totalHosts = '';
        var totalSubnets = '';
        var subnets = [];
        var broadcast = [];
        error = true;
    }

    res.render('index', { binaryIP, ipClass, netmaskCIDR, mask, ipPrivate, nextNetmask, totalHosts, totalSubnets, subred, broadcast, principal, error });
}*/
const index = (req, res) => {
    res.render('calc');
}

const calculate = (req, res) => {
    const { ip, mask, host, subred } = req.body;
    var ipInt = StringToIP(ip);
    console.log('IP en Binario: ', IPToBinary(ipInt));
    console.log('Clase de IP: ', IPClass(ipInt));
    console.log('IP privada: ', IsPrivate(ipInt));
    console.log('Mascara de Red por CIDR: ', IPToString(BinaryToIP(StringToIP(CIDRToNetmask(mask)))));
    console.log('Máscara Ampliada con subredes: ', IPToString(StringToIP(NextNetmaskBySubnet(PowerToInt(subred), StringToIP(IPToBinary(StringToIP(mask)))))));
    console.log('Host por subred', HostBySubnet(NextNetmaskBySubnet(PowerToInt(subred), StringToIP(IPToBinary(StringToIP(mask))))));
    console.log('Máscara Ampliada con hosts: ', IPToString(StringToIP(NextNetmaskByHosts(host))));
    console.log('Número de subredes: ', SubnetsByHosts(StringToIP(NextNetmaskByHosts(host))));
    console.log('Broadcast: ', GetBroadcast(ipInt, StringToIP(mask)));

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
    var binaryIP = '';ipInt
    for (let i = 0; i < ipInt.length; i++) {
        if (ipInt[i].toString(2).length != 8) {
            numBinary = ipInt[i].toString(2)
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
    for (let i = 0; i < mask.length; i++) {
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
    
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] == 255) {
            broadcast[i] = ip[i];
        }
        if (mask[i] == 0) {
            broadcast[i] = 255;
        }
        if (mask[i] != 0 && mask[i] != 255) {
            count = 256 - mask[i];
            do{
                n+=count;

            } while (n<=ip[i]);
            n--;
            broadcast[i]=n;
        }
    }
}    

           /* while (n < ip[i]) {
                n += count;
            }
            n--;
            broadcast[i] = n;
        }
    }
    return broadcast;
}*/
}}

    module.exports = {
        index, calculate
};



