import {formatDate} from 'utils/misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('06 January 2023'))).toBe('Jan 23')
})
