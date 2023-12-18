const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const CooolaOD = sequelize.define('cooola_od', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cstmrsvno: {
            type: DataTypes.STRING(20),//  
        },

        cstmrsvno1: {
            type: DataTypes.STRING(10)
        },

        cstmrsvno2: {
            type: DataTypes.STRING(255)
        },

        cstmrsvno3: {
            type: DataTypes.STRING(8)
        },


        brnchcd: {
           type: DataTypes.STRING(100)
        },


        pckngslpno: {
           type: DataTypes.STRING(100)
        },

        inqno: {
           type: DataTypes.STRING(100)
        },

        cstmordno: {
            type: DataTypes.STRING(100),
        },

        soplndate:  {
            type: DataTypes.STRING(100),
        },
        shipmntplndate:{
            type: DataTypes.STRING(100),
        },
        deliplndate:{
            type: DataTypes.STRING(100),
        } ,
        buyercd:  {
            type: DataTypes.STRING(100),
        },
        buyernm1: {
            type: DataTypes.STRING(100),
        },
        buyernm2: {
            type: DataTypes.STRING(100),
        },
        buyerzip1: {
            type: DataTypes.STRING(100),
        },
        buyerzip2:  {
            type: DataTypes.STRING(100),
        },
        buyeradrs11: {
            type: DataTypes.STRING(100),
        },
        buyeradrs12: {
            type: DataTypes.STRING(100),
        },
        buyeradrs21: {
            type: DataTypes.STRING(100),
        },
        buyeradrs22:  {
            type: DataTypes.STRING(100),
        },
        buyeradrs31:  {
            type: DataTypes.STRING(100),
        },
        buyeradrs32:  {
            type: DataTypes.STRING(100),
        },
        buyertel: {
            type: DataTypes.STRING(100),
        },
        buyertel2:  {
            type: DataTypes.STRING(100),
        },
        buyertel3:  {
            type: DataTypes.STRING(100),
        },
        buyerfax: {
            type: DataTypes.STRING(100),
        },
        buyerfax2:  {
            type: DataTypes.STRING(100),
        },
        buyerfax3:  {
            type: DataTypes.STRING(100),
        },
        delicd:  {
            type: DataTypes.STRING(100),
        },
        delinm1: {
            type: DataTypes.STRING(100),
        },
        delinm2:{
            type: DataTypes.STRING(100),
        },
        delinm3:  {
            type: DataTypes.STRING(100),
        },
        delinm21: {
            type: DataTypes.STRING(100),
        },
        delinm31:{
            type: DataTypes.STRING(100),
        } ,
        delizip1:{
            type: DataTypes.STRING(100),
        },
        delizip2:  {
            type: DataTypes.STRING(100),
        },
        deliadrs11: {
            type: DataTypes.STRING(100),
        },
        deliadrs12: {
            type: DataTypes.STRING(255),
        },
        deliadrs21: {
            type: DataTypes.STRING(100),
        },
        deliadrs22:  {
            type: DataTypes.STRING(100),
        },
        deliadrs31:  {
            type: DataTypes.STRING(100),
        },
        deliadrs32:  {
            type: DataTypes.STRING(100),
        },
        delitel: {
            type: DataTypes.STRING(100),
        },
        delitel2:  {
            type: DataTypes.STRING(100),
        },
        delitel3:  {
            type: DataTypes.STRING(100),
        },
        delifax: {
            type: DataTypes.STRING(100),
        },
        delifax2:  {
            type: DataTypes.STRING(100),
        },
        delifax3:  {
            type: DataTypes.STRING(100),
        },
        delimthdcd: {
            type: DataTypes.STRING(100),
        },
        delimthdnm:  {
            type: DataTypes.STRING(100),
        },
        gftflg: 0,
        divkbncd:  {
            type: DataTypes.STRING(100),
        },
        divkbnnm:  {
            type: DataTypes.STRING(100),
        },
        paymthdcd:  {
            type: DataTypes.STRING(100),
        },
        paymthdnm:  {
            type: DataTypes.STRING(100),
        },
        orddate: {
            type: DataTypes.STRING(100),
        },
        ordcnt:{
            type: DataTypes.STRING(100),
        },
        regcnt:  {
            type: DataTypes.STRING(100),
        },
        nptrid:  {
            type: DataTypes.STRING(100),
        },
        hedshptrid:  {
            type: DataTypes.STRING(100),
        },
        mmblank:  {
            type: DataTypes.STRING(100),
        },
        upprsyscd:  {
            type: DataTypes.STRING(100),
        },
        shpcd:  {
            type: DataTypes.STRING(100),
        },
        packcntrlcd1:  {
            type: DataTypes.STRING(100),
        },
        packcntrlcd2:  {
            type: DataTypes.STRING(100),
        },
        genecndcd1:  {
            type: DataTypes.STRING(100),
        },
        genecndcd2:  {
            type: DataTypes.STRING(100),
        },
        genecndcd3:  {
            type: DataTypes.STRING(100),
        },
        genecndcd4:  {
            type: DataTypes.STRING(100),
        },
        genecndcd5:  {
            type: DataTypes.STRING(100),
        },
        genecndtxt1:  {
            type: DataTypes.STRING(100),
        },
        genecndtxt2:  {
            type: DataTypes.STRING(100),
        },
        genecndtxt3:  {
            type: DataTypes.STRING(100),
        },
        genecndnum1:  {
            type: DataTypes.STRING(100),
        },
        genecndnum2:  {
            type: DataTypes.STRING(100),
        },
        genecndnum3:  {
            type: DataTypes.STRING(100),
        },
        designateddate:  {
            type: DataTypes.STRING(100),
        },
        delitimecd: {
            type: DataTypes.STRING(100),
        } ,
        delitimenm:  {
            type: DataTypes.STRING(100),
        },
        soremark:  {
            type: DataTypes.STRING(100),
        },
        soremark2:  {
            type: DataTypes.STRING(100),
        },
        spclwrkcd1:  {
            type: DataTypes.STRING(100),
        },
        spclwrknm1:  {
            type: DataTypes.STRING(100),
        },
        spclwrkcd2:  {
            type: DataTypes.STRING(100),
        },
        spclwrknm2:  {
            type: DataTypes.STRING(100),
        },
        spclwrkcd3:  {
            type: DataTypes.STRING(100),
        },
        spclwrknm3:  {
            type: DataTypes.STRING(100),
        },
        spclwrkcd4:  {
            type: DataTypes.STRING(100),
        },
        spclwrknm4:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv1:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv2:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv3:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv4:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv5:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv6:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv7:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv8:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv9:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv10:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv11:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv12:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv13:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv100:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv15:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv16:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv17:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv18:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv19:  {
            type: DataTypes.STRING(100),
        },
        hedstrrsrv20:  {
            type: DataTypes.STRING(100),
        },
        headnumrsrv1:  {
            type: DataTypes.STRING(100),
        },
        headnumrsrv2:  {
            type: DataTypes.STRING(100),
        },
        headnumrsrv3:  {
            type: DataTypes.STRING(100),
        },
        headnumrsrv4:  {
            type: DataTypes.STRING(100),
        },
        headnumrsrv5:  {
            type: DataTypes.STRING(100),
        },
        itemcd: {
            type: DataTypes.STRING(100),
        },
        itemnm: {
            type: DataTypes.STRING(255),
        },
        pckitemnm: {
            type: DataTypes.STRING(255),
        },
        unitprice: {
            type: DataTypes.STRING(100),
        },
        itemqty: {
            type: DataTypes.STRING(100),
        },
        ordqltycd:  {
            type: DataTypes.STRING(100),
        },
        ordqltynm:  {
            type: DataTypes.STRING(100),
        },
        ordlimitdate:  {
            type: DataTypes.STRING(100),
        },
        ordlimitdatecndcd:  {
            type: DataTypes.STRING(100),
        },
        ordlimitdatecndnm:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkey1:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndcd1:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndnm1:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkey2:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndcd2:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndnm2:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkey3:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndcd3:  {
            type: DataTypes.STRING(100),
        },
        ordstckmngkeycndnm3:  {
            type: DataTypes.STRING(100),
        },
        sodtlremark:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrkcd:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrknm:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrkcd２:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrknm2:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrkcd３:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrknm3:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrkcd４:  {
            type: DataTypes.STRING(100),
        },
        sodtlspclwrknm4:  {
            type: DataTypes.STRING(100),
        },
        dtlordcnt:  {
            type: DataTypes.STRING(100),
        },
        dtlregcnt:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndcd1:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndcd2:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndcd3:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndcd4:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndcd5:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndtxt1:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndtxt2:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndtxt3:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndnum1:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndnum2:  {
            type: DataTypes.STRING(100),
        },
        dtlgenecndnum3:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv1:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv2:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv3:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv4:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv5:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv6:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv7:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv8:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv9:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv10:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv11:{
            type: DataTypes.STRING(100),
        },
        detailstrrsrv12: {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv13: 1,
        detailstrrsrv100:  {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv15: {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv16: {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv17: {
            type: DataTypes.STRING(100),
        },
        detailstrrsrv18:{
            type: DataTypes.STRING(100),
        },
        detailstrrsrv19:{
            type: DataTypes.STRING(100),
        },
        detailstrrsrv20:{
            type: DataTypes.STRING(100),
        },
        coolkbn:  {
            type: DataTypes.STRING(100),
        },
        packqty:  {
            type: DataTypes.STRING(100),
        },
        delimailadrs:  {
            type: DataTypes.STRING(100),
        },
        delititle:  {
            type: DataTypes.STRING(100),
        },
        invitemcd1:  {
            type: DataTypes.STRING(100),
        },
        invitemnm1:  {
            type: DataTypes.STRING(100),
        },
        invitemcd2:  {
            type: DataTypes.STRING(100),
        },
        invitemnm2:  {
            type: DataTypes.STRING(100),
        },
        freight1:  {
            type: DataTypes.STRING(100),
        },
        freight2:  {
            type: DataTypes.STRING(100),
        },
        remark1:  {
            type: DataTypes.STRING(100),
        },
        remark2:  {
            type: DataTypes.STRING(100),
        },
        remark3:  {
            type: DataTypes.STRING(100),
        },
        remark4:  {
            type: DataTypes.STRING(100),
        },
        remark5:  {
            type: DataTypes.STRING(100),
        },
        remark6:  {
            type: DataTypes.STRING(100),
        },
        remark7:  {
            type: DataTypes.STRING(100),
        },
        remark8:  {
            type: DataTypes.STRING(100),
        },
        remark9:  {
            type: DataTypes.STRING(100),
        },
        remark10:  {
            type: DataTypes.STRING(100),
        },
        remark11:  {
            type: DataTypes.STRING(100),
        },
        remark12:  {
            type: DataTypes.STRING(100),
        },
        paykbn:  {
            type: DataTypes.STRING(100),
        },
        clctamnt:  {
            type: DataTypes.STRING(100),
        },
        clcttax:  {
            type: DataTypes.STRING(100),
        },
        insrmnt:  {
            type: DataTypes.STRING(100),
        },
        offcstpflg:  {
            type: DataTypes.STRING(100),
        },
        stpoffccd:  {
            type: DataTypes.STRING(100),
        },
        stpoffclclcd:  {
            type: DataTypes.STRING(100),
        },
        shipshopnm:  {
            type: DataTypes.STRING(100),
        },
        shipshoptel:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv1:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv2:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv3:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv4:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv5:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv6:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv7:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv8:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv9:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv10:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv11:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv12:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv13:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv100:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv15:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv16:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv17:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv18:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv19:  {
            type: DataTypes.STRING(100),
        },
        invstrrsrv20:  {
            type: DataTypes.STRING(100),
        },
        subtotal:  {
            type: DataTypes.STRING(100),
        },
        subtotalinc:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratesubtotal:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratesubtotal:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratesubtotaltax:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratesubtotaltax:  {
            type: DataTypes.STRING(100),
        },
        total:  {
            type: DataTypes.STRING(100),
        },
        totalinc:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratetotal:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratetotal:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratetotaltax:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratetotaltax:  {
            type: DataTypes.STRING(100),
        },
        alltotal:  {
            type: DataTypes.STRING(100),
        },
        alltotalinc:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratealltotal:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratealltotal:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratealltotaltax:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratealltotaltax:  {
            type: DataTypes.STRING(100),
        },
        pstamnt:  {
            type: DataTypes.STRING(100),
        },
        pstamntinc:  {
            type: DataTypes.STRING(100),
        },
        cmsnamnt:  {
            type: DataTypes.STRING(100),
        },
        cmsnamntinc:  {
            type: DataTypes.STRING(100),
        },
        cmsnamnt2:  {
            type: DataTypes.STRING(100),
        },
        cmsnamntinc2:  {
            type: DataTypes.STRING(100),
        },
        cmsnamnt3:  {
            type: DataTypes.STRING(100),
        },
        cmsnamntinc3:  {
            type: DataTypes.STRING(100),
        },
        cnsptax:  {
            type: DataTypes.STRING(100),
        },
        disconamnt:  {
            type: DataTypes.STRING(100),
        },
        disconamnt12:  {
            type: DataTypes.STRING(100),
        },
        disconamnt13:  {
            type: DataTypes.STRING(100),
        },
        disconamnt100:  {
            type: DataTypes.STRING(100),
        },
        disconamnt15:  {
            type: DataTypes.STRING(100),
        },
        disconamnt16:  {
            type: DataTypes.STRING(100),
        },
        disconamnt17:  {
            type: DataTypes.STRING(100),
        },
        disconamnt18:  {
            type: DataTypes.STRING(100),
        },
        disconamnt19:  {
            type: DataTypes.STRING(100),
        },
        disconamnt110:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnt:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamnt:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnttax:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamntrdctax:  {
            type: DataTypes.STRING(100),
        },
        disconamnt21:  {
            type: DataTypes.STRING(100),
        },
        disconamnt22:  {
            type: DataTypes.STRING(100),
        },
        disconamnt23:  {
            type: DataTypes.STRING(100),
        },
        disconamnt24:  {
            type: DataTypes.STRING(100),
        },
        disconamnt25:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnt2:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamnt2:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnttax2:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamntrdctax2:  {
            type: DataTypes.STRING(100),
        },
        disconamnt31:  {
            type: DataTypes.STRING(100),
        },
        disconamnt32:  {
            type: DataTypes.STRING(100),
        },
        disconamnt33:  {
            type: DataTypes.STRING(100),
        },
        disconamnt34:  {
            type: DataTypes.STRING(100),
        },
        disconamnt35:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnt3:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamnt3:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnttax3:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamntrdctax3:  {
            type: DataTypes.STRING(100),
        },
        disconamnt41:  {
            type: DataTypes.STRING(100),
        },
        disconamnt42:  {
            type: DataTypes.STRING(100),
        },
        disconamnt43:  {
            type: DataTypes.STRING(100),
        },
        disconamnt44:  {
            type: DataTypes.STRING(100),
        },
        disconamnt45:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnt4:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamnt4:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnttax4:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamntrdctax4:  {
            type: DataTypes.STRING(100),
        },
        disconamnt51:  {
            type: DataTypes.STRING(100),
        },
        disconamnt52:  {
            type: DataTypes.STRING(100),
        },
        disconamnt53:  {
            type: DataTypes.STRING(100),
        },
        disconamnt54:  {
            type: DataTypes.STRING(100),
        },
        disconamnt55:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnt5:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamnt5:  {
            type: DataTypes.STRING(100),
        },
        stdtaxratedisconamnttax5:  {
            type: DataTypes.STRING(100),
        },
        rdctaxratedisconamntrdctax5:  {
            type: DataTypes.STRING(100),
        },
        usablepoint:  {
            type: DataTypes.STRING(100),
        },
        usedpoint:  {
            type: DataTypes.STRING(100),
        },
        providpoint:  {
            type: DataTypes.STRING(100),
        },
        rmnpoint:  {
            type: DataTypes.STRING(100),
        },
        regterm:  {
            type: DataTypes.STRING(100),
        },
        regnextshipdate:  {
            type: DataTypes.STRING(100),
        },
        regnextarrvdate:  {
            type: DataTypes.STRING(100),
        },
        regnextarrvtime:  {
            type: DataTypes.STRING(100),
        },
        packshpcd:  {
            type: DataTypes.STRING(100),
        },
        comment:  {
            type: DataTypes.STRING(100),
        },
        cnt1:  {
            type: DataTypes.STRING(100),
        },
        cnt2:  {
            type: DataTypes.STRING(100),
        },
        billcstid:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem1:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem2:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem3:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem4:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem5:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem6:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem7:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem8:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem9:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem10:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem11: {
            type: DataTypes.STRING(100),
        },
        genpvaritem12: {
            type: DataTypes.STRING(100),
        },
        genpvaritem13:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem100:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem15:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem16:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem17:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem18:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem19:  {
            type: DataTypes.STRING(100),
        },
        genpvaritem20:  {
            type: DataTypes.STRING(100),
        },
        genpintitem1:  {
            type: DataTypes.STRING(100),
        },
        genpintitem2:  {
            type: DataTypes.STRING(100),
        },
        genpintitem3:  {
            type: DataTypes.STRING(100),
        },
        genpintitem4:  {
            type: DataTypes.STRING(100),
        },
        genpintitem5:  {
            type: DataTypes.STRING(100),
        },
        gmotrid:  {
            type: DataTypes.STRING(100),
        },
        gmodelizip:  {
            type: DataTypes.STRING(100),
        },
        gmodeliadrs1:  {
            type: DataTypes.STRING(100),
        },
        gmodeliadrs2:  {
            type: DataTypes.STRING(100),
        },
        buyercmpntnm:  {
            type: DataTypes.STRING(100),
        },
        buyerdptnm:  {
            type: DataTypes.STRING(100),
        },
        buyernm:  {
            type: DataTypes.STRING(100),
        },
        billshopnm:  {
            type: DataTypes.STRING(100),
        },
        shptrid:  {
            type: DataTypes.STRING(100),
        },
        billfreetxt1:  {
            type: DataTypes.STRING(100),
        },
        billfreetxt2:  {
            type: DataTypes.STRING(100),
        },
        billfreetxt3:  {
            type: DataTypes.STRING(100),
        },
        billfreetxt4:  {
            type: DataTypes.STRING(100),
        },
        billfreetxt5:  {
            type: DataTypes.STRING(100),
        },
        gmopscmpnynm:  {
            type: DataTypes.STRING(100),
        },
        gmopsinfo1:  {
            type: DataTypes.STRING(100),
        },
        gmopsinfo2:  {
            type: DataTypes.STRING(100),
        },
        gmopsinfo3:  {
            type: DataTypes.STRING(100),
        },
        gmopsinfo4:  {
            type: DataTypes.STRING(100),
        },
        invtitle:  {
            type: DataTypes.STRING(100),
        },
        atninfotxt1:  {
            type: DataTypes.STRING(100),
        },
        atninfotxt2:  {
            type: DataTypes.STRING(100),
        },
        atninfotxt3:  {
            type: DataTypes.STRING(100),
        },
        atninfotxt4:  {
            type: DataTypes.STRING(100),
        },
        strrsrv1:  {
            type: DataTypes.STRING(100),
        },
        strrsrv2:  {
            type: DataTypes.STRING(100),
        },
        strrsrv3:  {
            type: DataTypes.STRING(100),
        },
        strrsrv4:  {
            type: DataTypes.STRING(100),
        },
        strrsrv5:  {
            type: DataTypes.STRING(100),
        },
        strrsrv6:  {
            type: DataTypes.STRING(100),
        },
        strrsrv7:  {
            type: DataTypes.STRING(100),
        },
        strrsrv8:  {
            type: DataTypes.STRING(100),
        },
        strrsrv9:  {
            type: DataTypes.STRING(100),
        },
        strrsrv10:  {
            type: DataTypes.STRING(100),
        },
        billamttxt1:  {
            type: DataTypes.STRING(100),
        },
        billtaxtxt:  {
            type: DataTypes.STRING(100),
        },
        gmoorddate:  {
            type: DataTypes.STRING(100),
        },
        billdate:  {
            type: DataTypes.STRING(100),
        },
        paylimit:  {
            type: DataTypes.STRING(100),
        },
        infono1:  {
            type: DataTypes.STRING(100),
        },
        frkmtxt:  {
            type: DataTypes.STRING(100),
        },
        bnknm:  {
            type: DataTypes.STRING(100),
        },
        bnkcd:  {
            type: DataTypes.STRING(100),
        },
        bnkbrnchnm:  {
            type: DataTypes.STRING(100),
        },
        bnkbrnchcd:  {
            type: DataTypes.STRING(100),
        },
        kozakbn:  {
            type: DataTypes.STRING(100),
        },
        kozano:  {
            type: DataTypes.STRING(100),
        },
        kozanm:  {
            type: DataTypes.STRING(100),
        },
        billamttxt2:  {
            type: DataTypes.STRING(100),
        },
        ocrcd1:  {
            type: DataTypes.STRING(100),
        },
        ocrcd2:  {
            type: DataTypes.STRING(100),
        },
        hrkmpaylimit:  {
            type: DataTypes.STRING(100),
        },
        hrkmbuyernm:  {
            type: DataTypes.STRING(100),
        },
        infono2:  {
            type: DataTypes.STRING(100),
        },
        barcodeinfo:  {
            type: DataTypes.STRING(100),
        },
        billamttxt3:  {
            type: DataTypes.STRING(100),
        },
        jrybuyeradrs:  {
            type: DataTypes.STRING(100),
        },
        jrybuyercmpntnm:  {
            type: DataTypes.STRING(100),
        },
        jrybuyerdptnm:  {
            type: DataTypes.STRING(100),
        },
        jrybuyernm:  {
            type: DataTypes.STRING(100),
        },
        jryinfono1:  {
            type: DataTypes.STRING(100),
        },
        xmark:  {
            type: DataTypes.STRING(100),
        },
        hjrybuyercmpntnm:  {
            type: DataTypes.STRING(100),
        },
        hjrybuyerdptnm:  {
            type: DataTypes.STRING(100),
        },
        hjrybuyernm:  {
            type: DataTypes.STRING(100),
        },
        hjryinfono1:  {
            type: DataTypes.STRING(100),
        },
        hjryinfono2:  {
            type: DataTypes.STRING(100),
        },
        hjrybillamttxt:  {
            type: DataTypes.STRING(100),
        },
        hjrybilltaxtxt:  {
            type: DataTypes.STRING(100),
        },
        hjryshpnm:  {
            type: DataTypes.STRING(100),
        },
        stmptxt:  {
            type: DataTypes.STRING(100),
        },
        strrsrv:  {
            type: DataTypes.STRING(100),
        },
        strrsrv11:  {
            type: DataTypes.STRING(100),
        },
        strrsrv12:  {
            type: DataTypes.STRING(100),
        },
        strrsrv13:  {
            type: DataTypes.STRING(100),
        },
        strrsrv100:  {
            type: DataTypes.STRING(100),
        },
        strrsrv15:  {
            type: DataTypes.STRING(100),
        },
        exstr1:  {
            type: DataTypes.STRING(100),
        },
        exstr2:  {
            type: DataTypes.STRING(100),
        },
        exstr3:  {
            type: DataTypes.STRING(100),
        },
        exstr3_2:  {
            type: DataTypes.STRING(100),
        },
        exstr4:  {
            type: DataTypes.STRING(100),
        },
        exstr5:  {
            type: DataTypes.STRING(100),
        },
        exstr6:  {
            type: DataTypes.STRING(100),
        },
        exstr7:  {
            type: DataTypes.STRING(100),
        },
        exstr8:  {
            type: DataTypes.STRING(100),
        },
        exstr9:  {
            type: DataTypes.STRING(100),
        },
        exstr10:  {
            type: DataTypes.STRING(100),
        },
        exstr10_2:  {
            type: DataTypes.STRING(100),
        },
        exstr10_3:  {
            type: DataTypes.STRING(100),
        },
        exstr11:  {
            type: DataTypes.STRING(100),
        },
        exstr12:  {
            type: DataTypes.STRING(100),
        },
        exstr13:  {
            type: DataTypes.STRING(100),
        }
        
    },
    {
      timestamps: true,
    })

    return CooolaOD;
}