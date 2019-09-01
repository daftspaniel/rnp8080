import StringProcess from './StringProcess'

let tp = new StringProcess()

it('Set default line eding', () => {
  expect(tp.lineEnding).toEqual('\n')
})

it('Trims whitespace on text', () => {
  expect(tp.trim(' Hello ')).toEqual('Hello')
})

it('Removes numbers from text', () => {
  expect(tp.denumber(' Hello123 ')).toEqual(' Hello ')
})

it('Counts word', () => {
  expect(tp.getWordCount(' Hello ')).toEqual(1)
  expect(tp.getWordCount(' hello world. ')).toEqual(2)
  expect(tp.getWordCount('Dart is Awesome and cool!')).toEqual(5)
  expect(tp.getWordCount('Count ALL the words!')).toEqual(4)
})

it('Counts lines correctly.', () => {
  expect(tp.getLineCount('')).toEqual(0)
  expect(tp.getLineCount('hello')).toEqual(0)
  expect(tp.getLineCount('hello\n')).toEqual(1)
  expect(tp.getLineCount('hello\nthere\nare\napples\nin\nhere.')).toEqual(5)
})

it('Counts sentences correctly.', () => {
  expect(tp.getSentenceCount('')).toEqual(0)
  expect(tp.getSentenceCount('hello\n')).toEqual(1)
  expect(tp.getSentenceCount('hello to you.')).toEqual(1)
  expect(tp.getSentenceCount('hello to you')).toEqual(1)
  expect(tp.getSentenceCount('23. hello to you.')).toEqual(1)
  expect(tp.getSentenceCount('ello there are monkeys. Yes, there is. No! I don\'t know? hmmm')).toEqual(5)
  expect(
    tp.getSentenceCount(`1. turnip
  23. hello to you.
  3. Hmm
  4. Hope this works!`)
  ).toEqual(4)
})

it('Prefix each line correctly.', () => {
  expect(tp.prefixLines("", "TEST")).toEqual("TEST")
  expect(tp.prefixLines("a\nb\n", "TEST")).toEqual("TESTa\nTESTb\nTEST")
  expect(tp.prefixLines("asdf\nxyzz\n", "12345")).toEqual("12345asdf\n12345xyzz\n12345")
  expect(tp.prefixLines("Coffee", "Cup")).toEqual("CupCoffee")
})

it('Postfix each line correctly.', () => {
  expect(tp.postfixLines("", "TEST")).toEqual("TEST")
  expect(tp.postfixLines("a\nb\n", "TEST")).toEqual("aTEST\nbTEST\nTEST")
  expect(tp.postfixLines("asdf\nxyzz\n", "12345")).toEqual("asdf12345\nxyzz12345\n12345")
  expect(tp.postfixLines("Coffee", "Cup")).toEqual("CoffeeCup")
})

it('Numbers lines correctly.', () => {
  expect(tp.addNumbering("")).toEqual('')
  expect(tp.addNumbering("Hello")).toEqual("1. Hello\n")
  expect(tp.addNumbering("Hello\nWorld\n")).toEqual("1. Hello\n2. World\n")
  expect(tp.addNumbering("Hello\nWorld\nWorms\n")).toEqual(
    "1. Hello\n2. World\n3. Worms\n")
  expect(tp.addNumbering("Hello\n\nWorld\nWorms\n")).toEqual("1. Hello\n\n2. World\n3. Worms\n")
})

it('Convert tabs to spaces', () => {
  expect(
    tp.convertTabsToSpace('this\tis\tTABBED.')).toEqual('this    is    TABBED.')
  expect(tp.convertTabsToSpace('this\tis\tTABBED.', 2)).toEqual('this  is  TABBED.')
})

it('Doublespace text', () => {
  expect(tp.doubleSpaceLines('')).toEqual('')
  expect(tp.doubleSpaceLines('Moo\n')).toEqual('Moo\n\n')
  expect(tp.doubleSpaceLines('Moo\nBaa')).toEqual('Moo\n\nBaa')
  expect(tp.doubleSpaceLines('Moo\nBaa\n')).toEqual('Moo\n\nBaa\n\n')
  expect(tp.doubleSpaceLines('Moo\n\nBaa\n')).toEqual('Moo\n\n\n\nBaa\n\n')
})

it('Reverse text', () => {
  expect(tp.reverse('')).toEqual('')
  expect(tp.reverse('Moo')).toEqual('ooM')
  expect(tp.reverse("Zebras are cool!\nMonkeys are okay!\nDogs are the best!\n")).toEqual('Dogs are the best!\nMonkeys are okay!\nZebras are cool!')
})

it('Randomise lines', () => {
  expect(tp.randomise('')).toEqual('')
  expect(tp.randomise('Moo')).toEqual('Moo')
  expect(tp.randomise("Zebras are cool!\nMonkeys are okay!\nDogs are the best!\n").split('\n').length).toEqual(4)
  expect(tp.randomise("\n\nZebras are cool!\nMonkeys are okay!\nDogs are the best!\n").split('\n').length).toEqual(6)
})

it('Sort alpha - single line', () => {
  expect(tp.sort('Dogs are the best!')).toEqual('Dogs are best! the')
})

it('Sort alpha - multi line', () => {
  expect(tp.sort("Zebras are cool!\nMonkeys are okay!\nDogs are the best!")).toEqual("Dogs are the best!\nMonkeys are okay!\nZebras are cool!")
})

it('Sort line length', () => {
  expect(tp.sort("bb\nddddd\na\n")).toEqual("a\nbb\nddddd")
  expect(tp.sort("bb\nA\n").length).toEqual(4)
})

it('Duplicate Lines', () => {
  expect(tp.duplicateLines("")).toEqual("")
  expect(tp.duplicateLines("hello")).toEqual("hellohello")
  expect(tp.duplicateLines("hello\n")).toEqual("hellohello\n")
  expect(tp.duplicateLines("hello\nthere\nare\napples\nin\nhere.")).toEqual("hellohello\ntherethere\nareare\napplesapples\ninin\nhere.here.")
})

it('Duplicate Current Line', () => {
  expect(tp.duplicateLine("hello\nworld\n", 3)).toEqual("hello\nhello\nworld\n")
  expect(tp.duplicateLine('This is and intro\ntrouble\nclosing words', 20)).toEqual("This is and intro\ntrouble\ntrouble\nclosing words")
  expect(tp.duplicateLine("mouse\n", 0)).toEqual("mouse\nmouse\n")
  expect(tp.duplicateLine("mouse\n", 3)).toEqual("mouse\nmouse\n")
  expect(tp.duplicateLine("mouse\n", 4)).toEqual("mouse\nmouse\n")
  expect(tp.duplicateLine("mouse\n", 5)).toEqual("mouse\nmouse\n")
  expect(tp.duplicateLine("\nmouse", 0)).toEqual("\nmouse")
})

it('Generate repeated string', () => {
  expect(tp.generateRepeatedString("Moo")).toEqual("Moo")
  expect(tp.generateRepeatedString("Moo",0)).toEqual("")
  expect(tp.generateRepeatedString("Moo", 4)).toEqual("MooMooMooMoo")
})

it('Generate repeated string with newline', () => {
  expect(tp.generateRepeatedString("Moo", 1, true)).toEqual("Moo\n")
  expect(tp.generateRepeatedString("Moo",0,true)).toEqual("")
  expect(tp.generateRepeatedString("Moo", 4,true)).toEqual("Moo\nMoo\nMoo\nMoo\n")
})
