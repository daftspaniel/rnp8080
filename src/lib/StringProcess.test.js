import StringProcess from './StringProcess'

let tp = new StringProcess()

it('set default line eding', () => {
  expect(tp.lineend).toEqual('\n')
})

it('trims whitespace on text', () => {
  expect(tp.trim(' Hello ')).toEqual('Hello')
})

it('removes numbers from text', () => {
  expect(tp.denumber(' Hello123 ')).toEqual(' Hello ')
})

it('counts word', () => {
  expect(tp.getWordCount(' Hello ')).toEqual(1)
  expect(tp.getWordCount(' hello world. ')).toEqual(2)
  expect(tp.getWordCount('Dart is Awesome and cool!')).toEqual(5)
  expect(tp.getWordCount('Count ALL the words!')).toEqual(4)
})

it('counts lines correctly.', () => {
  expect(tp.getLineCount('')).toEqual(0)
  expect(tp.getLineCount('hello')).toEqual(0)
  expect(tp.getLineCount('hello\n')).toEqual(1)
  expect(tp.getLineCount('hello\nthere\nare\napples\nin\nhere.')).toEqual(5)
})

it('counts sentences correctly.', () => {
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
it('prefix each line correctly.', () => {
  expect(tp.prefixLines("", "TEST")).toEqual("TEST")
  expect(tp.prefixLines("a\nb\n", "TEST")).toEqual("TESTa\nTESTb\nTEST")
  expect(tp.prefixLines("asdf\nxyzz\n", "12345")).toEqual("12345asdf\n12345xyzz\n12345")
  expect(tp.prefixLines("Coffee", "Cup")).toEqual("CupCoffee")
})

it('postfix each line correctly.', () => {
  expect(tp.postfixLines("", "TEST")).toEqual("TEST")
  expect(tp.postfixLines("a\nb\n", "TEST")).toEqual("aTEST\nbTEST\nTEST")
  expect(tp.postfixLines("asdf\nxyzz\n", "12345")).toEqual("asdf12345\nxyzz12345\n12345")
  expect(tp.postfixLines("Coffee", "Cup")).toEqual("CoffeeCup")
})

it('numbers lines correctly.', () => {
  expect(tp.addNumbering("")).toEqual('')
  expect(tp.addNumbering("Hello")).toEqual("1. Hello\n")
  expect(tp.addNumbering("Hello\nWorld\n")).toEqual("1. Hello\n2. World\n")
  expect(tp.addNumbering("Hello\nWorld\nWorms\n")).toEqual(
    "1. Hello\n2. World\n3. Worms\n")
  expect(tp.addNumbering("Hello\n\nWorld\nWorms\n")).toEqual("1. Hello\n\n2. World\n3. Worms\n")
})

it('convert tabs to spaces', () => {
  expect(
    tp.convertTabsToSpace('this\tis\tTABBED.')).toEqual('this    is    TABBED.')
  expect(tp.convertTabsToSpace('this\tis\tTABBED.', 2)).toEqual('this  is  TABBED.')
})

it('doublespace text', () => {
  expect(tp.doubleSpaceLines('')).toEqual('')
  expect(tp.doubleSpaceLines('Moo\n')).toEqual('Moo\n\n')
  expect(tp.doubleSpaceLines('Moo\nBaa')).toEqual('Moo\n\nBaa')
  expect(tp.doubleSpaceLines('Moo\nBaa\n')).toEqual('Moo\n\nBaa\n\n')
  expect(tp.doubleSpaceLines('Moo\n\nBaa\n')).toEqual('Moo\n\n\n\nBaa\n\n')
})