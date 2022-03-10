import { h } from 'vue';
import Base from '@components/Dialog/Base.vue';

const wrapper = (props, context) => {
    return props.show ? h(Base, props, context.slots) : null
}

wrapper.props = ['show', 'onClose']

export default wrapper;