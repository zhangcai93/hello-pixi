import GameOver from './GameOver.vue';
import GameWin from './GameWin.vue';
import mount from '@common/helpers/mount'

const DialogMap = {
    GameOver,
    GameWin
}

const Dialog = {
    cache: {},
    show(name = '', options = {}) {
        const component = DialogMap[name];
        if (!component) return
        const { props = {} } = options;
        const extendProps = {
            ...props,
            show: true,
            onClose: () => {
                this.close(name);
            }
        }
        const res = mount(component, extendProps);

        this.cache[name] = {
            ...res,
            props
        }
    },

    close(name) {
        let cur = this.cache[name]
        if (cur) {
            cur.props.onClose && cur.props.onClose();
            cur.destroy();
            this.cache[name] = {}
        } else {
            for (let item in this.cache) {
                const curItem = this.cache[item]
                curItem.props.onClose && curItem.props.onClose();
                curItem.destroy();
                this.cache[item] = {}
            }
        }
    }
}
export default Dialog