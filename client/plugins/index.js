/**
 * 组件库入口
 * */

// 基础组件
import Text from './text'
import Image from './image'
import ImageCarousel from './image-carousel'
import TextCarousel from './text-carousel'
import RectangleBorder from './rectangle-border'
import Iframe from './iframe'
import Button from './button'
import video from './video'

// 表单组件
import Input from './input'
import Textarea from './textarea'
import Radio from './radio'
import Checkbox from './checkbox'
import Form from './form'
import popbutton from './popbutton'
import submitsuccess from './submitsuccess'
import formbutton from './formbutton'
import qkcity from './qkcity'
import qkdate from './qkdate'
import codebtn from './codebtn'


// 功能组件
import bgMusic from './bg-music'

// 业务组件
//弹出框组件
import date from './datePicker'
import city from './city'



// 所有组件列表
const components = [
	// 基础组件
	Text,
	Image,
	ImageCarousel,
	TextCarousel,
	RectangleBorder,
	Iframe,
	Button,
	// 表单组件
	Input,
	Radio,
	Checkbox,
	Textarea,
	date,
	city,
	Form,
	video,
	popbutton,
	submitsuccess,
	formbutton,
	qkcity,
	qkdate,
	codebtn,
	// 功能组件
	bgMusic,
	// 业务组件
]
// 定义 install 方法，接收 Vue 作为参数
const install = function (Vue) {
	// 判断是否安装，安装过就不继续往下执行
	if (install.installed) return
	install.installed = true
	// 遍历注册所有组件
	components.map(component => Vue.component(component.name, component))
}

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

let _qk_register_components_object = {};
components.forEach(item => {
	_qk_register_components_object[item.name] = item
})

export {
	Text,
	Image,
	ImageCarousel,
	TextCarousel,
	RectangleBorder,
	Iframe,
	Button,
	bgMusic,
	Input,
	Checkbox,
	date,
	city,
	Form,
	video,
	Textarea,
	popbutton,
	submitsuccess,
	formbutton,
	qkcity,
	qkdate,
	codebtn,
	_qk_register_components_object
}



export default {
	install,
	// 所有组件，必须具有 install，才能使用 Vue.use()
}
