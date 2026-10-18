import art0 from './art/quiet-corner.svg'
import art1 from './art/morning-ritual.svg'
import art2 from './art/weekend-market.svg'
import art3 from './art/linen-notes.svg'
const illustrations = {
  'quiet-corner': art0,
  'morning-ritual': art1,
  'weekend-market': art2,
  'linen-notes': art3,
}
export const getIllustration = (name) => illustrations[name]
