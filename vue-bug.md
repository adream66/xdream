

## bug

遍历实例下的数组，设置interval

定时器里面修改了依赖的值，导致computed的get函数重新执行，这个时候又去设置interval一直循环掉用，一直执行computed的get函数

```js
	const f = ref([{t:1}])
  // const l = ref('l')
  const fl = computed(()=>{
    console.log('computed执行');

    f.value.forEach(item=>{
      // console.log(item.t);  // 取值操作会为item.t收集computed依赖 item.t改变computed一直会执行
      setInterval(()=>{
        console.log(item.t);  // 如果放到定时器里面取值操作 就不会收集computed依赖 因为此时函数执行完没有activeEffect
        item.t = item.t + Math.random().toString(36).substring(7);
      },1000)
    })
    return f
  })
  循环执行定时器，cpu拉满。内存无法释放。
```



## computed

```js
// v2
// 页面A 有下面字段
computed:{
	fullName(){
		return this.firstName + this.lastName
	}
}


先 生成页面A的渲染watcher塞到数组
// 再生成fullName的computed watcher塞到数组，此时开始收集依赖：
1. fullName的computed watcher 先收集firstName和lastName这两个dep
2. firstName和lastName这两个dep会收集fullName的computed watcher
watcher.evaluate函数执行完，会把computed watcher弹出，此时将Dep.target赋值给页面A的渲染watcher

但是还要收集页面A的渲染watcher
if (Dep.target) {  //Dep.target =  页面A的渲染watcher
  watcher.depend(); // watch = fullName的computed watcher  
}

// v3
activeEffect为函数，函数执行，依旧通过dirty判断是否重新执行函数,触发属性get，depsMap收集该属性的effect。
当依赖的属性变了，更新会将dirty改为true,取值会重新执行函数，这里是computed里面的依赖收集effect。
还需要为computed value收集依赖，走的trackRefValue，为这个实例的value熟悉收集了页面的effect或者其他effect，在scheduler函数不仅会修改dirty，还会遍历value的dep执行依赖更新函数

// activeEffect
track(target,key){}

```

## 

## parse
实现思路：
1. 将template匹配不同的正则（开始标签正则、结束标签正则、标签关闭正则、标签属性正则等），匹配成功则交由不同别的方法处理（返回tagName、attributes、text等）
2. 在处理方法handleStartTag中，返回一个描述元素的对象（包含tag、type、children、parent、attrs等属性）将他们push到一个栈；
3. 在处理方法handleEndTag中，将元素pop出栈，并设置它及上一个元素的parent、children关系；
4. 在处理方法handleChars中，设置文本为currentParent的children元素；
5. 解析完一部分，template就截取掉一部分，然后循环继续匹配，直到template为空；
6. 通过进出栈操作，以及parent、children关系，建立一个树状结构（通过parent、children描述）



## extend

> 创建子类，继承Vue父类；并且身上有父类的所有功能

```js
  Vue.extend = function (extendOptions) {
    // 创建子类的构造函数，并且调用初始化方法
    const Sub = function VueComponent(options) {
      this._init(options); // this指向子类的实例
    };
    Sub.cid = cid++; // 组件的唯一标识

    // 使用原型继承，将子类继承父类 :（components的合并采用的是继承），所以可以在任何地方使用全局组件
    Sub.prototype = Object.create(this.prototype); // 子类原型指向父类 
    Sub.prototype.constructor = Sub; // constructor指向自己

    Sub.options = mergeOptions(this.options, extendOptions); // 合并自己的extendOptions和父类的options（即Vue.options）
    return Sub;
  };
```

## 创建组件：

> Vue.component(id,definition)就是调用 Vue.extend(definition)，并配置Vue.options.components.id = definition
>
> 组件实例执行`_init()`时，会把父类的options与自身的options进行合并，所以`Vue.options.components`会与自身options进行合并。对components进行合并时，采用**原型继承**的方式

1.  生成子类 Ctor = vm.$options._base.extend(Ctor);
2. 执行子类 生成实例 new Ctor()  执行init 渲染函数

流程：创建vnode 时会，会拿到组件的对象，然后通过执行extend方法生成VueComponent子类，在data的hook下放置对象

在patch阶段挂载的时候(准确的说是虚拟dom转为真实dom)会执行子组件init方法，所以就是为什么父子执行的生命周期是：

父created  父beforeMount 子created 子mounted  子mounted

```js
// 1 
let Ctor = vm.$options.components[tag]; // 获取组件的对象
return createComponent(vm, tag, data, key, children, Ctor);

// 2
if (isObject(Ctor)) {
  Ctor = vm.$options._base.extend(Ctor);
}
data.hook = {
  // 组件创建过程的自身初始化方法
  init(vnode) {
    let child = (vnode.componentInstance = new Ctor({ _isComponent: true })); // 实例化组件
    // 因为没有传入el属性，需要手动挂载，为了在组件实例上面增加$el方法可用于生成组件的真实渲染节点
    child.$mount(); // 组件挂载后会在vm上添加vm.$el 真实dom节点
  },
};

// 3
// 虚拟dom转成真实dom
function createElm(vnode) {
   if (createComponent(vnode)) {
     return vnode.componentInstance.$el;
   }
}
// 创建组件的真实dom
function createComponent(vnode) {
  // 初始化组件，创建组件实例
  let i = vnode.data;
  // 相当于执行 vnode.data.hook.init(vnode)
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  // 如果组件实例化完毕，有componentInstance属性，那证明是组件
  if (vnode.componentInstance) {
    return true;
  }
}
```

Vue.extend: Sub.options = mergeOptions(this.options, extendOptions); 

_init方法：vm.$options = mergeOptions(vm.constructor.options, options); 

> vm.constructor.options = Sub.options = 合并Vue的options和组件的options
>
> options: { _isComponent: true }  // new 子类的时候还会传递参数





## vue3

watcher 改为 effect

Dep.target  改为 activeEffect

get的时候走 track  set的时候走trigger

v3 的dep.js只负责创建deps, 创建的deps 为map. 处理是否是数组 数组还得收集下标 length

如果是数组，会走TriggerOpTypes.ADD dips还要添加depsMap的length.   

Vue3 监听的是对象，收集依赖是给某个对象上的某个字段去收集

不管reactive还是ref，reactive是weakMap保存对象的字段的deps，ref基于类实现get value set value，收集依赖的时候会将ref实例的value去收集，

```js
let obj = {a:1,b:2}
let arr = [1,2]
let depsMap = new WeakMap()
{
  {a:1,b:2}:{
    a:<Dep>Map,
    b:<Dep>Map  
  },
  [1,2]:{
    0:<Dep>Map,
    1:<Dep>Map,
    length:<Dep>Map  
  }  
}
```



```js
function track(target: object, type: TrackOpTypes, key: unknown) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep(() => depsMap!.delete(key))))
    }
    trackEffect(
      activeEffect,
      dep,)
  }
}
export function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  console.log(`触发 track -> target: ${target} type:${type} key:${key}`);
  // 1. 先基于 target 找到对应的 dep
  // 如果是第一次的话，那么就需要初始化
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 初始化 depsMap 的逻辑
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);

  if (!dep) {
    dep = createDep();

    depsMap.set(key, dep);
  }

  trackEffects(dep); //  dep.add(activeEffect);
}
1. activeEffect = effect 
2. effect执行
3. 依赖收集activeEffect,改变依赖继续执行
4. activeEffect = null
```



## 组件

### mountComponent

1. 先创建一个 component instance
   
2. setupComponent(instance);  处理props slot

3. 执行render。setupRenderEffect 

   生成更新函数（创建虚拟dom,patch,mount），用更新函数生成effect, 

   const update = instance.update = () => effect.run();
