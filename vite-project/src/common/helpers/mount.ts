import { render, h } from 'vue';

export default function mount(component: any, props: any, children: any, container: HTMLElement | null ){
    let el = container || document.body

    let vNode = h(component, props, children)

    render(vNode, el)

    const destroy = () => {
        if (el) {
            render(null, el)
        }
        // el = null
        // vNode = null
    }

    return { vNode, destroy, el }
}
  