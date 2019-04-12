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