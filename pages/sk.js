import React from 'react'
import Link from '@material-ui/core/Link'
import Calculator from '../components/Calculator'
import { getShareData } from '../src/share'

const Sk = ({ shareValues }) => {
  return (
    <Calculator
      versionId={'sk'}
      shareValues={shareValues}
      renderRegionInfo={() => <Link href="/">Přepnout na českou verzi</Link>}
      renderCo2Info={() => (
        <>
          Výchozí hodnota produkce CO<sub>2</sub> při výrobě energie vachází z dat{' '}
          <Link
            href="https://www.nuclear.sk/aky-je-dopad-spotreby-elektriny-na-klimu-pozrite-si-vybornu-electricity-map/"
            target="_blank"
            rel="noopener noreferrer">
            https://www.nuclear.sk/aky-je-dopad-spotreby-elektriny-na-klimu-pozrite-si-vybornu-electricity-map/
          </Link>.
        </>
      )}
    />
  )
}

Sk.getInitialProps = getShareData

export default Sk
