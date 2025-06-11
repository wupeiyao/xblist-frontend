

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "vant/lib/index.css"
import { Toast } from "vant"
import App from './App.vue'
import router from './router'
// 1. 引入你需要的组件
import { Button } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import { Uploader } from 'vant';
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import { Notify } from 'vant';
// 引入js
import "./style.css"
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { ShareSheet } from 'vant';
import { PullRefresh } from 'vant';
import Vant from 'vant';
import { Dialog } from 'vant';
import { Picker } from 'vant';
import { Form, Field, CellGroup } from 'vant';
import { NavBar } from 'vant';
import { Image as VanImage } from 'vant';

const app = createApp(App)
app.use(VanImage);
app.use(NavBar);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Dialog);
app.use(createPinia())
app.use(router)
app.use(Button);
app.use(Uploader)
app.use(Picker)
app.use(Toast)
app.use(Notify)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon)
app.use(ShareSheet)
app.use(PullRefresh);
app.use(Vant)
app.mount('#app')
