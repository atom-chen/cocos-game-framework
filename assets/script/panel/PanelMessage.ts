import { MPanel, MPanelExtends } from "../framework/MPanel";

const { ccclass, property, menu } = cc._decorator;
/** 界面参数 */
interface PanelParams {
    /** 打开参数 */
    OpenParams: {
        item: string | cc.Node
        f_yes?: () => void
        f_no?: () => void
    }
    /** 关闭参数 */
    CloseParams: {}
}
const C = {
    BORDER: 100,
    BTN_Y: -50,
}

/**
 * [Panel] 一个通用的message页面
 */
@ccclass
@menu("panel/PanelMessage")
export class PanelMessage extends MPanelExtends {

    static PATH = "PanelMessage"
    static TYPE = <"chain">"chain"
    static OPEN_PARAMS: PanelParams["OpenParams"]

    async on_open(params: typeof PanelMessage.OPEN_PARAMS) {
        if (typeof params.item === "string") {
            this.label_message.string = params.item
        } else if (params.item instanceof cc.Node) {
            this.label_message.string = ""
            let n = cc.instantiate(params.item)
            n.parent = this.label_message.node
            n.active = true
        } else {

        }
        this.f_yes = params.f_yes
        this.f_no = params.f_no
        this.btn_no.active = !!this.f_no
        await MPanel.in_scale(this.node)
    }

    async on_close() {
        await MPanel.out_scale(this.node)
    }

    f_yes: () => void = null
    f_no: () => void = null

    @property(cc.Label)
    label_message: cc.Label = null

    @property(cc.Node)
    btn_no: cc.Node = null

    event_ok() {
        this.f_yes && this.f_yes()
        MPanel.close(PanelMessage)
    }

    event_cancel() {
        this.f_no && this.f_no()
        MPanel.close(PanelMessage)
    }
}