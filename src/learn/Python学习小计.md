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

### 其他：
> Python 解释器遵循被称为读取、求值、打印、循环的周期，简称 REPL。每当你输入命令时，解释器会读取输入，求值，打印结果，然后循环回显示 >>>，以便你输入更多命令。
## 内置函数速查：
### A
- abs()：返回一个数字的绝对值，
```python
num = -15
absolute_value = abs(num)
print(absolute_value) # 15
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
- count(substring)：返回子字串在字串中出现的次数。
```python
my_str = 'hello world'
o_count = my_str.count('o')
print(o_count)  # 2
```
### D
### E
- elif:条件判断
- else:条件判断
- endswith(suffix)：返回一个布尔值，指示字串是否以指定的后缀结尾。
```python
my_str = 'hello world'
ends_with_world = my_str.endswith('world')
print(ends_with_world)  # True
```
### F
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
- int():返回由给定数字构造的整数：
```python
my_float = 12.92563
my_int = int(my_float)
print(my_int)  # 12
print(type(my_int))  # <class 'int'>
```
- isinstance:返回布尔值
```python
a=3
isinstance(a,int) #True
isinstance(a,(int,float)) #True
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
### N
### O
### P
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
- replace(old, new)：返回一个新建字串，其中所有的 old 都被替换为 new。
```python
my_str = 'hello world'
replaced_my_str = my_str.replace('hello', 'hi')
print(replaced_my_str)  # hi world
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
- strip()：返回一个新建字串，移除指定的前导和尾随字符。如果未传入参数，则移除前导和尾随空白字符。
```python
my_str = '  hello world  '
trimmed_my_str = my_str.strip()
print(trimmed_my_str)  # "hello world"
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
c