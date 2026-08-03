---
title: Python学习小计
category: 学习日记
date: "2026-07-28"
slug: python-learn-notes
excerpt: 记一下目前用过的但是老忘记的函数
---
# Python学习小计
学习站点在https://www.freecodecamp.org/chinese/learn/python-v9/
## 知识点：
### 变量和数据类型：
#### python是动态类型语言，变量类型取决于赋值的类型，最常用的数据类型有:
- 整数(int)：没有小数位的数，无论正负
- 浮点数(float)：带小数点的数，无论正负
- 字串(str)：由引号括起来的字符序列
- 布尔(bool)：标识真或假，写作True或Flase
- 集合(set)：无序元素的唯一集合，如`{0.5,4,'apple'}`
- 字典(dict)： 大括号包围的值序集，如`{'name':'John','age':28}`
- 元组(tuple)：不可变的有序集合，用括号括起来，如`('apple',4.5,7)`
- 范围(range)：一组数字序列，常用于循环，如`range(5)`
- 列表(list)：一个有序集合,如`[22,'hello',3.14,True]`
- None:一个表现值缺失的特殊值
#### 如何判断类型：
`type()`和`isinstance()`函数,如果想用布尔值表示数据类型常用`isinstance()`，这个函数也可以和多种数据类型相比较。
```python
a=3
print(type(a))      #<class 'int'>
print(type(a) is int)       #True
print(isinstance(a,int))      #True
b=4.2 #float
print(isinstance(b,(int,float)))  #True 因为b是浮点数，(int,float)中只要满足一个就返回True
```
### 字符串：
#### 基础定义:
由单引号或双引号包围的字符，如果需要多行字串则用三个单引号或双引号，如果字符串中有单（双）引号则用另一种包裹，或用\转义
```python
msg="It's a sunny day"
msg='she said:"Hi!"'
msg='It\'s a sunny day'
```
字符串不可变，类似`msg[0]='i'`会报错
#### 拼接和插值：
可以用`+`把多个字符串拼在一起，但仅仅适用于字串，数字要用str()转换一下，可以用扩充赋值`+=`直接拼接
```python
my_str_1 = 'Hello'
my_str_2 = "World"
str_plus_str = my_str_1 + ' ' + my_str_2  #Hello World
num=1
str_plus_str=str_plus_str+num #报错
str_plus_str+=str(num) #Hello World1
```
字符串插值F-string以f开头，紧跟引号，允许用花括号内括变量名标识待填充变量，也可以采用空的花括号站位，然后用format填入变量
```python
name = 'John Doe'
age = 26
name_and_age = f'My name is {name} and I am {age} years old'
print(name_and_age) # My name is John Doe and I am 26 years old
num1 = 5
num2 = 10
print(f'The sum of {num1} and {num2} is {num1 + num2}') # The sum of 5 and 10 is 15
print("The sum of {} and {} is {}".format(num1,num2,num1+num2)) #(format)The sum of 5 and 10 is 15
```
#### 字串切片：
前置知识：索引，索引是从零开始的每个字符的编号，索引为负表示倒数第几
```python
my_str = "Hello world"
print(my_str[0])  # H
print(my_str[6])  # w
print(my_str[-1]) # d
```
字符切片可以提取字串的一部分或仅仅处理特定部分，`string[start:stop:step]`,start默认为0,stop默认在字符串结尾，step表示跨几个执行，默认0,可不写，当step是负数时会从尾到头提取。被切片的字符串本身不会改变，如果要提取则需要将切片部分单独赋值存储。
```python
my_str = 'Hello world'
print(my_str[1:4]) # ell
print(my_str[8:])  # rld
print(my_str)  # Hello world
print(my_str[0:11:2])  # Hlowrd
print(my_str[::-1]) # dlrow olleH
```
#### 常见字符串方法：
upper()：返回一个所有字符都转换为大写的新建字串。
```python
my_str = 'hello world'
uppercase_my_str = my_str.upper()
print(uppercase_my_str)  # HELLO WORLD
```
lower()：返回一个所有字符都转换为小写的新建字串。
```python
my_str = 'Hello World'
lowercase_my_str = my_str.lower()
print(lowercase_my_str)  # hello world
```
strip()：返回一个新建字串，移除指定的前导和尾随字符。如果未传入参数，则移除前导和尾随空白字符。
```python
my_str = '  hello world  '
trimmed_my_str = my_str.strip()
print(trimmed_my_str)  # "hello world"
```
replace(old, new)：返回一个新建字串，其中所有的 old 都被替换为 new。
```python
my_str = 'hello world'
replaced_my_str = my_str.replace('hello', 'hi')
print(replaced_my_str)  # hi world
```
split(separator)：将字串按指定的分隔符拆分成字串列表。如果未指定分隔符，则按空白字符拆分。
```python
my_str = 'hello world'
split_words = my_str.split()
print(split_words)  # ['hello', 'world']
```
join(iterable)：将可迭代对象的元素用分隔符连接成一个字串。
```python
my_list = ['hello', 'world']
joined_my_str = ' '.join(my_list)
print(joined_my_str)  # hello world
```
startswith(prefix)：返回一个布尔值，指示字串是否以指定的前缀开头。
```python
my_str = 'hello world'
starts_with_hello = my_str.startswith('hello')
print(starts_with_hello)  # True
```
endswith(suffix)：返回一个布尔值，指示字串是否以指定的后缀结尾。
```python
my_str = 'hello world'
ends_with_world = my_str.endswith('world')
print(ends_with_world)  # True
```
find(substring)：返回 substring 第一次出现的索引，如果未找到则返回 -1。
```python
my_str = 'hello world'
world_index = my_str.find('world')
print(world_index)  # 6
```
count(substring)：返回子字串在字串中出现的次数。
```python
my_str = 'hello world'
o_count = my_str.count('o')
print(o_count)  # 2
```
capitalize()：返回一个新字串，首个字符大写，其余字符小写。
```python
my_str = 'hello world'
capitalized_my_str = my_str.capitalize()
print(capitalized_my_str)  # Hello world
```
isupper()：如果字串中的所有字母都是大写，则返回 True，否则返回 False。
```python
my_str = 'hello world'
is_all_upper = my_str.isupper()
print(is_all_upper)  # False
```
islower()：如果字串中所有字母都是小写，则返回 True，否则返回 False。
```python
my_str = 'hello world'
is_all_lower = my_str.islower()
print(is_all_lower)  # True
```
title()：返回一个新建字串，其中每个单词的首字母均大写。
```python
my_str = 'hello world'
title_case_my_str = my_str.title()
print(title_case_my_str)  # Hello World
```

### 数字计算：
#### 数学计算：
`+(加)，-(减)，*(乘),/(除)`和正常计算一样，新增`//(整除)`，比如`5//2=2`，舍弃小数点的整数计算，`%`取模运算，`5%2=1`，做除法运算的余数，可以整除则余数为0,`6%3=0`,`**`幂函数，`2**3=8`
Python 还提供了用于将数字数据或字串转换为整数或浮点数的内置函数。
`float()` 函数返回由给定数字构造的浮点数：
```python
my_int_1 = 56
my_float_1 = float(my_int_1)
print(my_float_1)  # 56.0
print(type(my_float_1))  # <class 'float'>
```
`int()`函数返回由给定数字构造的整数：
```python
my_float = 12.92563
my_int = int(my_float)
print(my_int)  # 12
print(type(my_int))  # <class 'int'>
```


以下是 Python 提供的用于处理整数和浮点数的其他一些方法。
round()：将数字四舍五入到指定的小数位数。默认情况下，此函数将数字四舍五入到最接近的整数，并返回没有小数位的整数：
```python
my_int_1 = 4.798
my_int_2 = 4.253
rounded_int_1 = round(my_int_1)
rounded_int_2 = round(my_int_2, 1)
print(rounded_int_1) # 5
print(rounded_int_2) # 4.3
```
abs()：返回一个数字的绝对值，
```python
num = -15
absolute_value = abs(num)
print(absolute_value) # 15
```
pow()：将一个数字提升到另一个数字的幂，或执行模幂运算。
```python
result_1 = pow(2, 3)  # Equivalent to 2 ** 3
print(result_1)  # 8
result_2 = pow(2, 3, 5)  # (2 ** 3) % 5
print(result_2)  # 3
```
#### 扩充字符：
简洁，高效的完成变量的更改
```python
my_var = 10
my_var += 5
print(my_var) # 15
count = 14
count -= 3
print(count) # 11
product = 65
product *= 7
print(product) # 455
price = 100
price /= 4
print(price) # 25.0
total_pages = 23
total_pages //= 5
print(total_pages) # 4
bits = 35
bits %= 2
print(bits) # 1
power = 2
power **= 3
print(power) # 8
```
部分数字计算及扩充字符对字符串的更改也适用
```python
greet = 'Hello'
greet += ' World'
print(greet) # Hello World
greet = 'Hello'
greet *= 3
print(greet) # HelloHelloHello
```
注意，c语言，c++,java中的自增(++)自减(--)不能在python中应用
### 布尔值和条件式：
#### 条件式及条件判断
条件式语句，或称条件式，返回布尔值，让你根据某些条件是真还是假来控制你的程序流程。
| 操作符 | 名称 | 描述 |
| :---: | :--- | :--- |
| == | 相等 | 查看两个值是否相等 |
| != | 不相等 | 查看两个值是否不相等 |
| > | 大于 | 查看左边的值是否大于右边的值 |
| < | 小于 | 查看左边的值是否小于右边的值 |
| >= | 大于或相等 | 查看左边的值是否大于或相等于右边的值 |
| <= | 小于或相等 | 查看左边的值是否小于或相等于右边的值 |
在 Python 中，最基本的条件式是 if 语句。以下是基本语法：
```python
if condition:
    pass # 如果条件为真代码执行
```
`if`语句以`if`关键字开始。`condition`是一个求值为`True`或`False`的表达式，后跟冒号（:）。
`if`语句的体构成一个代码块，它是一组属于同一整体的语句。在 Python 中，缩排的级别决定了代码块。
在上面的示例中`if`语句的体包含一个`pass`语句。当执行`pass`语句时，不会发生任何事情。这是一个特殊的关键字，可用作未来代码的占位符，当不允许空代码块时非常有用。
if 语句体内的代码仅在条件计算结果为 True 时运行。例如：
```python
age = 18
if age >= 18:
    print('You are an adult') # You are an adult
```
如果想在if为假的时候执行另一种语句该怎么办呢？else 子句在 if 条件为假时运行。下面是 if…else 语句的语法：
```python
age = 12
if age >= 18:
    print('You are an adult')   #不打印
else:
    print('You are not an adult yet') # You are not an adult yet
```
请注意，你不能在 if 块和 else 子句之间放置任何语句。以下代码将引起`SyntaxError`：
```python
age = 12

if age >= 18:
    print('You are an adult')
print('Almost there!')
else: # SyntaxError: invalid syntax
    print('You are not an adult yet')
```
如果有多种判断情况则可以使用`elif`关键字:
```python
age = 12
if age >= 18:
    print('You are an adult')
elif age >= 13:
    print('You are a teenager')
else:
    print('You are a child') # You are a child
```

#### 布尔操作符和短路：
现实判断的时候往往要考虑多方面，比如肯德基的疯狂星期四，这种就需要布尔操作符（逻辑操作符）。
但在介绍操作符之前，先来看看什么是真值和假值。
在 Python 中，每个值都有固有的布尔值，或者说在逻辑上下文中应被视为 True 或 False 的内置含义。许多值被认为是真值，即它们在逻辑上下文中计算为 True。其他值是假值，意味着它们计算为 False。
下面是一些假值：
- None
- False
- 整数 0
- 浮点数 0.0
- 空字串 ""
其他值如非零数字和非空字串都是真值。

如果你想查看一个值是真值还是假值，可以使用内置的 bool() 函数。它显式地将一个值转换为其布尔等价物，并为真值返回 True，为假值返回 False。以下是一些示例：
```python
print(bool(False)) # False
print(bool(0))  # False
print(bool('')) # False

print(bool(True)) # True
print(bool(1)) # True
print(bool('Hello')) # True
```
那么了解真假值之后，让我们看看怎么用展示疯狂星期四：
```python
restaurant='KFC'
date='Thursday'
if restaurant == 'KFC' and date == 'Thursday':
    print("vivo 50")  #vivo 50
```
`and`操作符在前后都为真是才会返回`True`，这就意味着当第一个元素是假值时，无论第二个元素的布尔值如何，结果都是`Flase`。`or`操作符则是只要有一个真值就返回`True`,所以当第一个元素是真值时，无论第二个元素的布尔值如何，结果都是`True`。`not`词如起名，真的？not，你现在是假的。另外强调一下优先级，优先级是优先执行的顺序，通常为`not>and>or`。
```python
a=True
b=1
print(a and b)  #1
print(b and a)  #True
print(a or b)  #True
print(b or a)  #1
print(not b)  #False
print(not a)  #False
```

### 函数和作用域：
#### 函数：
函数是可重用的代码片段，当你调用它们时会运行。许多编程语言随附内置函数，使入门更容易。Python 也不例外，我们已经在之前的课程中介绍了一些内置函数，比如 print()。
另一个有用的内置函数是 input()，它允许你提示用户输入：
```python
name = input('What is your name?') # User types "Kolade" and presses Enter  
print('Hello', name) # Output: Hello Kolade
```
另一方面，int() 将数字、布尔值和数字字串转换为整数：
```python
print(int(3.14)) # 3
print(int('42')) # 42
print(int(True)) # 1
print(int(False)) # 0 
```
你也可以编写你自己的自定义函数。你将使用 def 关键字自定义函数，def后跟你想给函数命名的名称、一对括号和冒号。然后在新的一行，编写你的函数应运行的代码。函数运行的代码也称为函数的体。
```python
def hello():
    print('Hello World')  #print('Hello World')就是hello函数的体
```
调用这个函数就和调用print()函数一样，不过因为hello()是空参数，所以调用的时候直接输入`hello()`即可，如果你想在括号里加点参数，也可以尝试修改hello()函数
```python
def hello():
    print('Hello World')
hello()   #Hello World
def hello(name):
    print(f'Hello {name}')
user_name='John'
hello(user_name)    #Hello John
```
自定义函数在不设置return的情况下默认返回None，有return的情况下函数的返回值由函数return回来的变量决定。
```python
def hello():
    print('hello')
def sum_num(a,b):     #sum函数是python求数字列表元素之和的函数
    return a+b
def hello_return():
    return 'Hello World'
print(type(hello()))          #<class 'NoneType'>
print(type(sum_num(1,2)))     #<class 'int'>
print(type(hello_return()))     #<class 'str'>
```
#### 作用域：
在介绍之前，先来给各位来段可能有点反直觉的代码
```python
def change(num):
    num=3
    print(num)
    return num
a=1
change(a)   #3
print(a)    #1
```
笔者的心理历程belike:对的对的，诶，不对，我返回的值哪去了。为什么这样呢，看看接下来的python定义域，或许你会有所了解。

在 Python 中，作用域决定了你可以访问变量的点。它控制变量的生命期以及变量在代码不同部分的解析方式。为了正确确定作用域，Python 遵循 LEGB 规则，该规则代表以下内容：
- 局部作用域 (L)：在函数或类中定义的变量。
> 在函数或类内部声明的变量只能在该函数或类内部访问,外部无法访问该作用域
```python
def my_func():
    my_var = 10 #my_var作用在my_func函数定义的作用域内
    print(my_var)

my_func() # 10

print(my_var) # NameError: name 'my_var' is not defined
```
- 封闭作用域 (E)：定义在封闭或嵌套函数中的变量。
> 嵌套在另一个函数内部的函数可以访问它所嵌套的函数的变量
```python
def outer_func():
    msg = 'Hello there!'

    def inner_func():
        print(msg)

    inner_func()
    
outer_func() # Hello there!
```
> 内部函数 inner_func 可以自由访问在外部函数 outer_func 中定义的 msg 变量。然而，外部函数无法访问在任何嵌套函数中定义的变量
```python
def outer_func():
    msg = 'Hello there!'
    print(res)

    def inner_func():
        res = 'How are you?'
        print(msg)

    inner_func()    

outer_func() # NameError: name 'res' is not defined
```
> 如果外部函数想要访问内部函数的话可以使用nonlocal关键字，接下来举例在包含的作用域中，即 outer_func 内，将 res 初始化为空字串。然后在 inner_func 中，使用 nonlocal 关键字将 res 设为非局部变量：
```python
def outer_func():
    msg = 'Hello there!'
    res = ""  # Declare res in the enclosing scope

    def inner_func():
        nonlocal res  # Allow modification of an enclosing variable
        res = 'How are you?'
        print(msg)  # Accessing msg from outer_func()

    inner_func()
    print(res)  # Now res is accessible and modified

outer_func()

# Output:
# Hello there!
# How are you?
```
> 这里提供一个邪修的记法，不过还不确定是不是绝对正确的：无def/class就是大圆，每定义一个def/class就是在大圆里画一个小圆，小圆可以使用大圆的变量，大圆正常情况下用不了小圆的变量,这边用双def嵌套定义验证一下：
```python
a=3
def pr():
    def prin():
        print(a)
    prin()
pr()    #3
```
- 全局作用域 (G)： 在模块或文件顶层定义的变量。
> 声明在任何函数或类之外的变量，这些变量可以在程序的任何地方访问。这里，my_var 可以在任何地方访问，即使是在它未定义的函数内部
```python
my_var = 100
def show_var():
    print(my_var)
show_var() # 100
print(my_var) # 100
```
> 如果你想让在函数内部定义的局部作用域变量可以全局访问，你可以使用 global 关键字
```python
my_var_1 = 7
def show_vars():
    global my_var_2
    my_var_2 = 10
    print(my_var_1)
    print(my_var_2)
show_vars() # 7 10
# my_var_2现在是全局变量，可以在任何地方访问
print(my_var_2) # 10
```
> global还可以在函数内部修改全局定义的变量，注意global关键字是在全局寻找同名的变量，然后在函数内对变量进行修改，现在让我们重新尝试一下最开始那个反常的代码
```python
def change():
    global a
    a=3
a=1
change()
print(a)    #3
```
- 内置作用域 (B)：Python 中为预定义函数、模块、关键字和对象保留的名称。
> python内置的函数，关键字，模块等，print(),global,int,type等都在内置作用域中，内置作用域可以任意使用
### 循环和序列操作：
#### 列表及其工作原理：
列表(list)是由字串、数字甚至其他列表组成的有序元素序列。列表是可变的，使用零基索引，这意味着列表的第一个元素位于索引零。索引也可以是负数，表示从后往前计算索引值，以下是声明一个列表并访问索引0和-1的元素。
```python
cities = ['Los Angeles', 'London', 'Tokyo']
print(type(cities))     #<class 'list'>
print(f'the first city in list is {cities[0]}')     #the first city in list is Los Angeles
print(f'the last city in list is {cities[-1]}')     #the last city in list is Tokyo
```
还可以采用 list() 函数将任何可迭代对象转换为列表，包括字符串、元组、集合、字典、range、生成器等。
```python
s = 'abc'
print(list(s))  # ['a', 'b', 'c']
t = (1, 2, 3)
print(list(t))  # [1, 2, 3]
st = {'a', 'b', 'c'}
print(list(st))  # 例如 ['a', 'b', 'c']，集合无序
d = {'x': 1, 'y': 2}
print(list(d))  # ['x', 'y']，字典转换为键列表
r = range(3)
print(list(r))  # [0, 1, 2]
g = (i * 2 for i in range(3))
print(list(g))  # [0, 2, 4]
```
len()函数也可以返回列表中元素的个数，同时，列表不同于字符串的地方在于它可以修改某个索引的元素，如果你输入的元素索引超出了列表大小(无论正负)都会报错。
```python
fruits = ['apple', 'banana', 'cherry']
print(len(fruits))  # 3
fruits[1] = 'orange'
print(fruits)  # ['apple', 'orange', 'cherry']
# 如果索引超出范围，会报 IndexError
fruits[3] = 'pear'  # IndexError: list assignment index out of range
```
如果你想删除某个元素，可以使用 del 语句。
```python
fruits = ['apple', 'banana', 'cherry']
del fruits[1]
print(fruits)  # ['apple', 'cherry']
```
如果想查询一个元素是否在列表中，可以使用关键字 in，返回布尔值。
```python
fruits = ['apple', 'banana', 'cherry']
print('banana' in fruits)  # True
print('pear' in fruits)    # False
```
列表也可以嵌套在列表中，嵌套的列表只占用一个索引，可以通过访问对应索引访问嵌套进去的列表，你还可以在进一步，用两个索引参数来访问嵌套列表中的元素。
```python
nested = [1, [2, 3], ['a', 'b']]
print(nested[1])    # [2, 3]
print(nested[1][0]) # 2
print(nested[2][1]) # b
```
列表的一种常用技术是对列表解包值，解包值是一种将列表中元素赋值给新变量的技术。
```python
colors = ['red', 'green', 'blue']
a, b, c = colors
print(a)  # red
print(b)  # green
print(c)  # blue
```
也可以提取部分变量后收集剩余变量。
```python
colors = ['red', 'green', 'blue', 'yellow']
a, b, *rest = colors
print(a)      # red
print(b)      # green
print(rest)   # ['blue', 'yellow']
```
解包值赋值给每个变量依次赋值时，如果赋值变量的总数和元素数不一样的话就会报错。
```python
values = [1, 2, 3]
a, b = values
# ValueError: not enough values to unpack (expected 2, got 3)

values = [1, 2, 3]
a, b, c, d = values
# ValueError: not enough values to unpack (expected 4, got 3)
```
列表的另一个操作是切片，具体参考[字符串中的切片介绍](#字串切片)
#### 列表的常用方法：
首先是append()方法，它可以把一个元素(不一定是单个元素)添加到列表的尾部。
```python
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # [1, 2, 3, 4]
```
如果你有一个列表但又不想把它整体嵌入另一个列表的后面，试试extend()方法，它可以将一个列表的多个元素依次添加到另一个列表的尾部。
```python
numbers = [1, 2, 3]
more_numbers = [4, 5]
numbers.extend(more_numbers)
print(numbers)  # [1, 2, 3, 4, 5]
```
如果不想加在尾部的话，那就试试insert()方法，它可以在特定索引处加入元素。
```python
numbers = [1, 2, 3]
numbers.insert(1, 1.5)
print(numbers)  # [1, 1.5, 2, 3]
```
插入说完了，现在介绍怎么删除，首先是remove()方法，它可以删除指定元素，不过注意，remove并不会删除所有指定元素，它只会删除按照索引查找到的第一个指定元素。
```python
numbers = [1, 2, 3, 2]
numbers.remove(2)
print(numbers)  # [1, 3, 2]
```
如果列表中没有指定元素，会抛出 `ValueError`。
```python
numbers = [1, 2, 3]
# numbers.remove(4)  # ValueError: list.remove(x): x not in list
```
如果要删除对应索引的值则需要用pop()方法，在括号中加入你要删除的元素的索引即可，不加也可以，pop会默认帮你删掉最后一个元素，另外，pop会返回它删了什么。。
```python
numbers = [1, 2, 3]
removed_item = numbers.pop(1)
print(removed_item)  # 2
print(numbers)       # [1, 3]

last_item = numbers.pop()
print(last_item)     # 3
print(numbers)       # [1]
```
然后是你发现列表内的元素不是你要用的，但你不想放弃这个变量，试试 clear()，它可以一键清空列表内元素。
```python
numbers = [1, 2, 3]
numbers.clear()
print(numbers)  # []
```
接下来是列表排序，sort()方法和sorted()函数。sort()方法会对原列表进行原地排序并返回 None，不能直接对切片结果原地排序，因为 `lst[1:3]` 是一个新的列表副本。sorted()函数则返回排序后的新列表，它可以接受切片表达式作为参数。
```python
items = [3, 1, 4, 2]
items.sort()
print(items)  # [1, 2, 3, 4]

items = [3, 1, 4, 2]
sorted_slice = sorted(items[1:3])
print(sorted_slice)  # [1, 4]
print(items)        # [3, 1, 4, 2]
```
如果你想把排序后的切片结果放回原列表，可以这样写：
```python
items = [3, 5, 1, 4, 2]
items[1:4] = sorted(items[1:4])
print(items)  # [3, 1, 4, 5, 2]
```
接下来是反转列表，reverse()方法可以原地反转列表的元素。
```python
items = [1, 2, 3, 4]
items.reverse()
print(items)  # [4, 3, 2, 1]
```
最后是index()方法，它会返回指定元素在列表中第一次出现的索引，如果没有则抛出 `ValueError`。
```python
numbers = [1, 2, 3, 2]
index_of_two = numbers.index(2)
print(index_of_two)  # 1

index_of_four=numbers.index(4)  # ValueError: 4 is not in list
```
#### 元组及其工作原理：
元组(tuple)是 Python 的一种数据类型，用于创建有序的值序列。元组可以包含多种不同类型的数据，例如字符串、数字和布尔值。
```python
developer = ('Alice', 34, 'Rust Developer')
print(developer)  # ('Alice', 34, 'Rust Developer')
```
元组类似于列表，但列表是可变的，而元组是不可变的。这意味着一旦创建，元组中的元素不能被更改。
```python
programming_languages = ('Python', 'Java', 'C++', 'Rust')
# programming_languages[0] = 'JavaScript'  # TypeError
```
如果尝试修改元组中的元素，将会得到 `TypeError`：
```python
programming_languages = ('Python', 'Java', 'C++', 'Rust')
programming_languages[0] = 'JavaScript'
```
```
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: 'tuple' object does not support item assignment
```
要访问元组元素，可以使用索引：
```python
developer = ('Alice', 34, 'Rust Developer')
print(developer[1])  # 34
```
也可以使用负索引从末尾访问：
```python
numbers = (1, 2, 3, 4, 5)
print(numbers[-2])  # 4
```
如果索引超出元组长度，将抛出 `IndexError`：
```python
numbers = (1, 2, 3, 4, 5)
numbers[7]
```
```
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
IndexError: tuple index out of range
```
另一种创建元组的方法是使用 `tuple()` 构造函数：
```python
developer = 'Jessica'
print(tuple(developer))  # ('J', 'e', 's', 's', 'i', 'c', 'a')
```
`tuple()` 可以接受字符串、列表、其他元组等可迭代对象。
可以使用 `in` 关键字检查某项是否在元组中：
```python
programming_languages = ('Python', 'Java', 'C++', 'Rust')
print('Rust' in programming_languages)       # True
print('JavaScript' in programming_languages) # False
```
元组也支持解包：
```python
developer = ('Alice', 34, 'Rust Developer')
name, age, job = developer
print(name)  # Alice
print(age)   # 34
print(job)   # Rust Developer
```
如果你只想保留部分元素，可以用星号收集剩余部分：
```python
developer = ('Alice', 34, 'Rust Developer')
name, *rest = developer
print(name)  # Alice
print(rest)  # [34, 'Rust Developer']
```
元组支持切片操作：
```python
desserts = ('cake', 'pie', 'cookies', 'ice cream')
print(desserts[1:3])  # ('pie', 'cookies')
```
切片的第一个索引是开始位置，第二个索引是结束位置，但结束位置的元素不包含在内。
由于元组是不可变的，不能删除其中的元素：
```python
developer = ('Jane Doe', 23, 'Python Developer')
del developer[1]
```
```
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: 'tuple' object doesn't support item deletion
```
当你需要一个固定且不可变的数据集合时，应该使用元组；而如果你需要一个可以添加、删除、更新元素的动态集合，则应该使用列表。
#### 元组的常用方法

在元组中，常见的操作包括统计、查找和生成排序后的新列表。下面按用途逐个介绍这些方法和函数。

首先是 `count()` 方法，它用于统计某个值在元组中出现的次数。
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust')
print(programming_languages.count('Rust'))  # 2
```
如果该值不存在，则返回 `0`：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust')
print(programming_languages.count('JavaScript'))  # 0
```
如果没有为 `count()` 提供参数，则会报 `TypeError`：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust')
programming_languages.count()
```
```
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: tuple.count() takes exactly one argument (0 given)
```

下一个是 `index()` 方法，它用于查找某个值在元组中第一次出现的索引位置。
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust')
print(programming_languages.index('Java'))  # 1
```
如果元组中没有指定的值，会抛出 `ValueError`：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust')
programming_languages.index('JavaScript')
```
```
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ValueError: tuple.index(x): x not in tuple
```
`index()` 还可以接受可选的起始索引和结束索引参数：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust', 'Python')
print(programming_languages.index('Python', 3))  # 5
```
这里从索引 `3` 开始查找，因此返回后面那个 `Python` 的位置 `5`。

你也可以指定起始和结束范围：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust', 'Python', 'JavaScript', 'Python')
print(programming_languages.index('Python', 2, 5))  # 2
```
因为查找范围是 `[2, 5)`，所以只会在索引 `2`、`3`、`4` 中搜索。

另一个常用函数是 `sorted()`。`sorted()` 可以用于任何可迭代对象，包括元组，并且总是返回一个新的已排序列表。
```python
numbers = (13, 2, 78, 3, 45, 67, 18, 7)
print(sorted(numbers))  # [2, 3, 7, 13, 18, 45, 67, 78]
```
这与列表的 `sort()` 方法不同，后者只适用于列表并且会原地排序，不返回新列表。

如果你想定制排序顺序，可以使用 `key` 参数，例如按元素长度排序：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust', 'Python')
print(sorted(programming_languages, key=len))
# ['C++', 'Rust', 'Java', 'Rust', 'Python', 'Python']
```
如果你想要结果按相反顺序排列，可以使用 `reverse=True`：
```python
programming_languages = ('Rust', 'Java', 'Python', 'C++', 'Rust', 'Python')
print(sorted(programming_languages, reverse=True))
# ['Rust', 'Rust', 'Python', 'Python', 'Java', 'C++']
```

#### 循环的工作原理：
##### for 循环
`for` 循环用于遍历可迭代对象，并对其中每个元素执行相同的语句块。例如，下面的示例遍历一个列表并打印每个元素：
```python
programming_languages = ['Rust', 'Java', 'Python', 'C++']

for language in programming_languages:
    print(language)
```
结果将是：
```
Rust
Java
Python
C++
```
注意 `print(language)` 在循环内部有缩进。没有那个缩进，Python 会把它当作循环外的语句，从而报错：
```python
programming_languages = ['Rust', 'Java', 'Python', 'C++']

for language in programming_languages:
print(language)
```
```
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
IndentationError: expected an indented block after 'for' statement on line 3
```

`for` 循环也可以遍历其他可迭代对象，比如字符串：
```python
for char in 'code':
    print(char)
```
结果为：
```
c
o
d
e
```
##### 嵌套 for 循环
Python 支持在 `for` 循环内部再写一个 `for` 循环。下面示例中，外层循环遍历分类，内层循环遍历对应的食物列表：
```python
categories = ['Fruit', 'Vegetable']
foods = ['Apple', 'Carrot', 'Banana']

for category in categories:
    for food in foods:
        print(category, food)
```
控制台输出：
```
Fruit Apple
Fruit Carrot
Fruit Banana
Vegetable Apple
Vegetable Carrot
Vegetable Banana
```
外层循环每次迭代都会触发内层循环的完整遍历。
##### while 循环
`while` 循环会重复执行代码块，直到条件变为 `False`。下面是一个猜数字的示例：
```python
secret_number = 3
guess = 0

while guess != secret_number:
    guess = int(input('Guess the number (1-5): '))
    if guess != secret_number:
        print('Wrong! Try again.')

print('You got it!')
```
在这个例子里，程序先将 `secret_number` 设为 `3`，把 `guess` 初始化为 `0`。循环的每次迭代都会读取用户输入，并将输入的字符串转换为整数保存到 `guess`。如果猜错了，打印提示并继续循环；如果猜对了，循环结束并打印祝贺信息。

这是一个可能的运行结果：
```
Guess the number (1-5): 2
Wrong! Try again.
Guess the number (1-5): 1
Wrong! Try again.
Guess the number (1-5): 3
You got it!
```
##### break 和 continue
Python 中的 `break` 用于立即结束循环；`continue` 用于跳过当前迭代、继续下一次循环。

下面示例使用 `break`：
```python
developer_names = ['Jess', 'Naomi', 'Tom']

for developer in developer_names:
    if developer == 'Naomi':
        break
    print(developer)
```
输出只会是：
```
Jess
```
因为当遇到 `Naomi` 时，循环直接结束。

下面示例使用 `continue`：
```python
developer_names = ['Jess', 'Naomi', 'Tom']

for developer in developer_names:
    if developer == 'Naomi':
        continue
    print(developer)
```
现在输出为：
```
Jess
Tom
```
当 `developer` 为 `Naomi` 时，`continue` 跳过本次迭代，循环继续处理下一个元素。
##### 循环的 else 子句
`for` 和 `while` 循环都可以带 `else` 子句，只有当循环没有被 `break` 终止时，`else` 中的代码才会执行。下面的示例用于检测单词是否包含元音：
```python
words = ['sky', 'apple', 'rhythm', 'fly', 'orange']

for word in words:
    for letter in word:
        if letter.lower() in 'aeiou':
            print(f"'{word}' contains the vowel '{letter}'")
            break
    else:
        print(f"'{word}' has no vowels")
```
输出为：
```
'sky' has no vowels
'apple' contains the vowel 'a'
'rhythm' has no vowels
'fly' has no vowels
'orange' contains the vowel 'o'
```
这里 `else` 对应的是内层 `for` 循环。只有当内层循环没有执行 `break` 时，才会进入 `else` 分支。

#### 范围的工作原理及使用:
`range()` 函数用于生成一个整数序列，通常用于 `for` 循环中。它的基本形式是：
```python
range(start, stop, step)
```
其中，唯一必需的参数是 `stop`，它表示生成序列的结束位置，但这个结束位置本身是不包含在结果中的。

例如，下面的代码会生成 `0`、`1`、`2` 三个整数：
```python
for num in range(3):
    print(num)
```
输出为：
```
0
1
2
```
因为 `range(3)` 从默认的 `0` 开始，到 `3` 结束，但不包含 `3`。

如果指定 `start` 参数，序列将从该值开始，例如：
```python
for num in range(1, 5):
    print(num)
```
这会打印：
```
1
2
3
4
```
`range()` 也可以通过 `step` 参数改变步长，默认为 `1`。下面的示例生成从 `2` 到 `10`（包含 `10`）的偶数序列：
```python
for num in range(2, 11, 2):
    print(num)
```
输出为：
```
2
4
6
8
10
```

`range()` 的参数必须是整数。如果你不给 `range()` 提供任何参数，就会收到 `TypeError`：
```python
range()
```
```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: range expected at least 1 argument, got 0
```
如果你传入浮点数，也会报错，因为 `range()` 只能处理整数参数：
```python
range(1.5)
```
```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'float' object cannot be interpreted as an integer
```

`range()` 还可以生成递减序列，只要 `step` 设置为负整数：
```python
for num in range(40, 0, -10):
    print(num)
```
输出为：
```
40
30
20
10
```

你也可以把 `range()` 的结果传给 `list()`，生成一个实际的列表：
```python
numbers = list(range(2, 11, 2))
print(numbers)  # [2, 4, 6, 8, 10]
```
#### 其他循环可用参数：
在之前的课程中，你学习了如何使用 `for` 循环来重复执行一段代码块。这里有一个最常见的用法，它遍历 `languages` 列表并打印每个元素：
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']

for language in languages:
    print(language)
```
如果你想同时跟踪每个元素的索引，一种做法是手动维护一个 `index` 变量：
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']

index = 0

for language in languages:
    print(f'Index {index} and language {language}')
    index += 1
```
这样可以工作，但更简洁的方式是使用 `enumerate()` 函数。`enumerate()` 会为可迭代对象中的每个元素生成一个索引，并返回一个枚举对象。
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']

print(list(enumerate(languages)))
# [(0, 'Spanish'), (1, 'English'), (2, 'Russian'), (3, 'Chinese')]
```
枚举对象中的每一项都是一个二元组，里面包含索引和值。你可以在循环中直接解包：
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']

for index, language in enumerate(languages):
    print(f'Index {index} and language {language}')
```
输出为：
```
Index 0 and language Spanish
Index 1 and language English
Index 2 and language Russian
Index 3 and language Chinese
```
这样就无需手动增加索引值了。

`enumerate()` 还接受一个可选的 `start` 参数，用于指定起始索引：
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']

for index, language in enumerate(languages, 1):
    print(f'Index {index} and language {language}')
```
输出为：
```
Index 1 and language Spanish
Index 2 and language English
Index 3 and language Russian
Index 4 and language Chinese
```

如果你需要同时迭代多个可迭代对象，可以使用 `zip()` 函数。`zip()` 会把多个序列按位置配对，返回一个元组的迭代器。
```python
developers = ['Naomi', 'Dario', 'Jessica', 'Tom']
ids = [1, 2, 3, 4]

print(list(zip(developers, ids)))
# [('Naomi', 1), ('Dario', 2), ('Jessica', 3), ('Tom', 4)]
```
然后在循环中解包每个配对：
```python
developers = ['Naomi', 'Dario', 'Jessica', 'Tom']
ids = [1, 2, 3, 4]

for name, dev_id in zip(developers, ids):
    print(f'Name: {name}')
    print(f'ID: {dev_id}')
```
输出为：
```
Name: Naomi
ID: 1
Name: Dario
ID: 2
Name: Jessica
ID: 3
Name: Tom
ID: 4
```
`zip()` 会根据最短的可迭代对象停止配对，因此如果两个列表长度不同，结果会按较短列表截断。

#### 列表推导式和其他列表操作函数：
在过去的几节课中，你已经看到如何使用 `for` 循环来构建一个新列表，例如下面的代码会收集 0 到 20 之间的偶数：
```python
even_numbers = []

for num in range(21):
    if num % 2 == 0:
        even_numbers.append(num)

print(even_numbers)
```
这个示例创建了一个空列表 `even_numbers`，然后遍历 `0` 到 `20` 的数字序列。每次循环都会检查当前数字是否能被 `2` 整除，如果是，就把它追加到列表末尾。

这种写法可以工作，但如果你想要更简洁、直接的代码，列表推导式能把循环和条件放到一行内：
```python
even_numbers = [num for num in range(21) if num % 2 == 0]
print(even_numbers)
```
这里的列表推导式会遍历 `range(21)`，仅在条件 `num % 2 == 0` 为真时将当前数字加入新列表。

还可以在列表推导式内部使用三元表达式来对每个元素生成不同的结果，例如将数字标记为“Even”或“Odd”：
```python
numbers = [1, 2, 3, 4, 5]
result = [(num, 'Even') if num % 2 == 0 else (num, 'Odd') for num in numbers]
print(result)
```
输出为：
```
[(1, 'Odd'), (2, 'Even'), (3, 'Odd'), (4, 'Even'), (5, 'Odd')]
```
当你想从现有可迭代对象创建新列表时，除了列表推导式，还有一些函数也很有用。

`filter()` 可以根据条件选择元素，并返回一个过滤器对象。下面示例只保留长度大于 4 的单词：
```python
words = ['tree', 'sky', 'mountain', 'river', 'cloud', 'sun']

def is_long_word(word):
    return len(word) > 4

long_words = list(filter(is_long_word, words))
print(long_words)  # ['mountain', 'river', 'cloud']
```

`map()` 会将指定函数应用到可迭代对象的每个元素上，并返回一个映射对象。例如，将摄氏温度转换为华氏温度：
```python
celsius = [0, 10, 20, 30, 40]

def to_fahrenheit(temp):
    return (temp * 9/5) + 32

fahrenheit = list(map(to_fahrenheit, celsius))
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]
```

还有一个用于求和的内置函数 `sum()`，它会计算可迭代对象中所有元素的总和：
```python
numbers = [5, 10, 15, 20]
total = sum(numbers)
print(total)  # 50
```
`sum()` 还接受一个可选的 `start` 参数，用于设置初始值：
```python
numbers = [5, 10, 15, 20]
total = sum(numbers, 10)
print(total)  # 60
```
你也可以用关键字参数写法，使意图更清晰：
```python
total = sum(numbers, start=10)
print(total)  # 60
```

### lambda函数及工作原理：
lambda 函数是匿名内联函数，通常用于把简单的表达式直接传给 `map()`、`filter()` 这类高阶函数，不需要先定义具名函数。

用 `def` 定义平方函数：
```python
def square(num):
    return num ** 2

print(square(4))  # 16
```

用 lambda 重写：
```python
lambda num: num ** 2
```

lambda 没有函数名，适合作为参数传给高阶函数。例如用 `filter()` 筛出偶数：
```python
numbers = [1, 2, 3, 4, 5]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]
```
**注意:**
不要把 lambda 赋值给变量，这会失去匿名函数的意义，应该改用 `def`：
```python
# 不推荐
square = lambda x: x ** 2
squared_numbers = list(map(square, numbers))
print(squared_numbers)  # [1, 4, 9, 16, 25]

# 推荐
def square(num):
    return num ** 2

squared_numbers = list(map(square, numbers))
print(squared_numbers)  # [1, 4, 9, 16, 25]
```

避免写难以阅读的复杂 lambda，遇到多条件逻辑应拆成普通函数：
```python
# 不推荐
result = (lambda x: (x ** 2 + 2 * x - 1) if x > 0 else (x ** 3 - x + 4))(3)
print(result)  # 14

# 推荐
def calculate_expression(x):
    if x > 0:
        return x ** 2 + 2 * x - 1
    else:
        return x ** 3 - x + 4

print(calculate_expression(3))  # 14
```
总结：单个内联表达式适合用 lambda，其余情况优先用常规函数。

### 其他：
> 方法和函数的区别：1.应用方式不同，函数直接调用或带入参数，方法在操作对象后调用;2.方法更像是对象的行为，函数则偏向于独立的工具
> python文件以.py结尾，可在终端以python file.py的方式启动

> Python 解释器遵循被称为读取、求值、打印、循环的周期，简称 REPL。每当你输入命令时，解释器会读取输入，求值，打印结果，然后循环回显示 >>>，以便你输入更多命令。
## 函数及方法速查(自定义的别在这找了，再找我削你了)：
### A
- abs()：返回一个数字的绝对值，
```python
num = -15
absolute_value = abs(num)
print(absolute_value) # 15
```
- append(item)：将元素追加到列表末尾。
```python
items = [1, 2]
items.append(3)
print(items)  # [1, 2, 3]
```
### B
- bool:查询元素布尔值，返回True或Flase。
### C
- capitalize()：返回一个新字串，首个字符大写，其余字符小写。
```python
my_str = 'hello world'
capitalized_my_str = my_str.capitalize()
print(capitalized_my_str)  # Hello world
```
- clear()：清空列表中的所有元素，列表保持存在但变为空列表。
```python
numbers = [1, 2, 3]
numbers.clear()
print(numbers)  # []
```
- count(value)：返回该值在序列中出现的次数。对于字符串，统计子字符串出现次数；对于列表和元组，则统计元素出现次数。
```python
my_str = 'hello world'
o_count = my_str.count('o')
print(o_count)  # 2

numbers = [1, 2, 1, 3]
print(numbers.count(1))  # 2

tuple_values = ('a', 'b', 'a')
print(tuple_values.count('a'))  # 2
```
### D
- def：使用 `def` 关键字定义具名函数。
```python
def square(num):
    return num ** 2
```
- del：删除列表或其他可变序列中的元素。
```python
fruits = ['apple', 'banana', 'cherry']
del fruits[1]
print(fruits)  # ['apple', 'cherry']
```
### E
- elif:条件判断
- else:条件判断
- endswith(suffix)：返回一个布尔值，指示字串是否以指定的后缀结尾。
```python
my_str = 'hello world'
ends_with_world = my_str.endswith('world')
print(ends_with_world)  # True
```
- enumerate(iterable, start=0)：返回一个枚举对象，迭代时每个元素会变成 `(index, value)` 的元组。
```python
languages = ['Spanish', 'English', 'Russian', 'Chinese']
print(list(enumerate(languages)))
# [(0, 'Spanish'), (1, 'English'), (2, 'Russian'), (3, 'Chinese')]
```
- extend(iterable)：将一个可迭代对象的元素依次追加到列表末尾。
```python
numbers = [1, 2, 3]
more_numbers = [4, 5]
numbers.extend(more_numbers)
print(numbers)  # [1, 2, 3, 4, 5]
```
### F
- filter(function, iterable)：返回一个过滤器对象，只包含使 `function(item)` 为 `True` 的元素。
```python
words = ['tree', 'sky', 'mountain', 'river', 'cloud', 'sun']

def is_long_word(word):
    return len(word) > 4

long_words = list(filter(is_long_word, words))
print(long_words)  # ['mountain', 'river', 'cloud']
```
- find(substring)：返回 substring 第一次出现的索引，如果未找到则返回 -1。
```python
my_str = 'hello world'
world_index = my_str.find('world')
print(world_index)  # 6
```
- float():返回由给定数字构造的浮点数：
```python
my_int_1 = 56
my_float_1 = float(my_int_1)
print(my_float_1)  # 56.0
print(type(my_float_1))  # <class 'float'>
```
- format():字符串方法，用于格式化字符串。
```python
message = 'The sum of {} and {} is {}'.format(5, 10, 15)
print(message)  # The sum of 5 and 10 is 15
```
### G
- global():在封闭寻找全局同名变量直接修改
```python
def change():
    global a
    a=3
a=1
change()
print(a)    #3
```
### H
### I
- if:条件判断
- index(value)：返回序列中第一个匹配元素的索引；如果元素不存在，会抛出 `ValueError`。
```python
numbers = [1, 2, 3, 2]
index_of_two = numbers.index(2)
print(index_of_two)  # 1

tuple_values = ('a', 'b', 'a')
print(tuple_values.index('b'))  # 1
```
- input(prompt)：从标准输入读取一行字符串。
```python
name = input('What is your name? ')
print(name)
```
- insert(index, item)：在指定位置插入元素到列表。
```python
numbers = [1, 2, 3]
numbers.insert(1, 1.5)
print(numbers)  # [1, 1.5, 2, 3]
```
- int():返回由给定数字构造的整数：
```python
my_float = 12.92563
my_int = int(my_float)
print(my_int)  # 12
print(type(my_int))  # <class 'int'>
```
- isinstance:返回布尔值
```python
a = 3
print(isinstance(a, int))          # True
print(isinstance(a, (int, float))) # True
```
- islower()：如果字串中所有字母都是小写，则返回 True，否则返回 False。
```python
my_str = 'hello world'
is_all_lower = my_str.islower()
print(is_all_lower)  # True
```
- isupper()：如果字串中的所有字母都是大写，则返回 True，否则返回 False。
```python
my_str = 'hello world'
is_all_upper = my_str.isupper()
print(is_all_upper)  # False
```
### J
- join(iterable)：将可迭代对象的元素用分隔符连接成一个字串。
```python
my_list = ['hello', 'world']
joined_my_str = ' '.join(my_list)
print(joined_my_str)  # hello world
```
### K
### L
- lambda：创建匿名内联函数，常用于作为高阶函数的参数。
```python
lambda num: num ** 2
```
- len(iterable)：返回可迭代对象或集合的长度。
```python
fruits = ['apple', 'banana', 'cherry']
print(len(fruits))  # 3
```
- list(iterable)：将可迭代对象转换为列表。
```python
t = (1, 2, 3)
print(list(t))  # [1, 2, 3]

s = 'abc'
print(list(s))  # ['a', 'b', 'c']
```
- lower()：返回一个所有字符都转换为小写的新建字串。
```python
my_str = 'Hello World'
lowercase_my_str = my_str.lower()
print(lowercase_my_str)  # hello world
```
### M
- maketrans(str1,str2):接受两个等长度的字符串，并将字符串按一一对应的顺序构建映射表,使用str.maketrans()调用
```python
str1="abc"
str2="xyz"
table=str.maketrans(str1,str2)
print(table)      #{97: 120, 98: 121, 99: 122}
```
- map(function, iterable)：返回一个映射对象，将 `function` 应用于可迭代对象的每个元素。
```python
celsius = [0, 10, 20, 30, 40]

def to_fahrenheit(temp):
    return (temp * 9/5) + 32

fahrenheit = list(map(to_fahrenheit, celsius))
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]
```
- max(iterable)：返回可迭代对象中的最大值。
```python
print(max([1, 2, 3]))  # 3
```
- min(iterable)：返回可迭代对象中的最小值。
```python
print(min([1, 2, 3]))  # 1
```
### N
### O
### P
- pop(index=-1)：删除并返回指定索引处的元素，默认删除最后一个元素。
```python
numbers = [1, 2, 3]
item = numbers.pop(1)
print(item)    # 2
print(numbers) # [1, 3]
```
- pow()：将一个数字提升到另一个数字的幂，或执行模幂运算。
```python
result_1 = pow(2, 3)  # Equivalent to 2 ** 3
print(result_1)  # 8
result_2 = pow(2, 3, 5)  # (2 ** 3) % 5
print(result_2)  # 3
```
- print:打印，貌似没什么好说的
### Q
### R
- range(stop)：生成一个从 0 到 stop-1 的整数序列。也可以传入 start 和 step。
```python
for i in range(3):
    print(i)
# 0
# 1
# 2
```
- remove(value)：从列表中删除第一个匹配的元素。
```python
numbers = [1, 2, 3, 2]
numbers.remove(2)
print(numbers)  # [1, 3, 2]
```
- replace(old, new)：返回一个新建字串，其中所有的 old 都被替换为 new。
```python
my_str = 'hello world'
replaced_my_str = my_str.replace('hello', 'hi')
print(replaced_my_str)  # hi world
```
- return：从函数中返回一个值，并结束函数的执行。
```python
def square(num):
    return num ** 2
```
- reverse():将列表原地反转。
```python
items = [1, 2, 3, 4]
items.reverse()
print(items)  # [4, 3, 2, 1]
```
- round()：将数字四舍五入到指定的小数位数。默认情况下，此函数将数字四舍五入到最接近的整数，并返回没有小数位的整数：
```python
my_int_1 = 4.798
my_int_2 = 4.253
rounded_int_1 = round(my_int_1)
rounded_int_2 = round(my_int_2, 1)
print(rounded_int_1) # 5
print(rounded_int_2) # 4.3
```
### S
- sort():将列表原地排序，返回None。

```python
a=[5,3,1,4,2]
a.sort()
print(a) #[1,2,3,4,5]
```
- sorted():功能和sort一样，但返回一个排好序的列表。

```python
a=[5,3,1,2,4]
a_sorted=sorted(a)
print(a_sorted) #[1,2,3,4,5]
```
- split(separator)：将字串按指定的分隔符拆分成字串列表。如果未指定分隔符，则按空白字符拆分。

```python
my_str = 'hello world'
split_words = my_str.split()
print(split_words)  # ['hello', 'world']
```
- startswith(prefix)：返回一个布尔值，指示字串是否以指定的前缀开头。
```python
my_str = 'hello world'
starts_with_hello = my_str.startswith('hello')
print(starts_with_hello)  # True
```
- str():将对象转换为字符串。
```python
num = 123
print(str(num))  # '123'
```
- strip()：返回一个新建字串，移除指定的前导和尾随字符。如果未传入参数，则移除前导和尾随空白字符。
```python
my_str = '  hello world  '
trimmed_my_str = my_str.strip()
print(trimmed_my_str)  # "hello world"
```
- sum(iterable, start=0)：返回可迭代对象中所有元素的总和，可选 `start` 参数指定初始值。
```python
numbers = [5, 10, 15, 20]
total = sum(numbers)
print(total)  # 50

total_with_offset = sum(numbers, 10)
print(total_with_offset)  # 60
```
### T
- title()：返回一个新建字串，其中每个单词的首字母均大写。
```python
my_str = 'hello world'
title_case_my_str = my_str.title()
print(title_case_my_str)  # Hello World
```
- translate():根据maketrans生成的映射表转换字符，使用方法：str_to_trans.translate(table)
```python
text = "hello abc world"

# 生成映射表：将 a->1, b->2, c->3
table = str.maketrans("abc", "123")

result = text.translate(table)
print(result)  # 输出: hello 123 world
```
- tuple(iterable)：将可迭代对象转换为元组。
```python
print(tuple('Jessica'))  # ('J', 'e', 's', 's', 'i', 'c', 'a')
```
- type:返回字符类型
```python
a=3
type(3) #<class 'int'>
```
### U
- upper()：返回一个所有字符都转换为大写的新建字串。
```python
my_str = 'hello world'
uppercase_my_str = my_str.upper()
print(uppercase_my_str)  # HELLO WORLD
```
### V
### W
### X
### Y
### Z
- zip(*iterables)：将多个可迭代对象按位置配对，返回一个元组的迭代器。
```python
developers = ['Naomi', 'Dario', 'Jessica', 'Tom']
ids = [1, 2, 3, 4]
print(list(zip(developers, ids)))
# [('Naomi', 1), ('Dario', 2), ('Jessica', 3), ('Tom', 4)]
```
