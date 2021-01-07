import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import './Classes.scss';
import { useMst } from '../../stores';
import Grid from '@material-ui/core/Grid';

/* eslint-disable-next-line */
export interface ClassesProps {}

export const Classes: React.FC<ClassesProps> = observer((props) => {
  const { t } = useTranslation();
  const { configStore } = useMst();

  return (
    <div>
      {/* Example for using Translations */}
      {t('CLASSES_CLASS-DETAILS_BTN-BACK-CLASSES')}

      <Grid container>
        <Grid item xs={6}>
          {/* This is an enabled wiget based on loaded config */}
        </Grid>
      </Grid>
      {/* This is a disabled widget based on loaded config */}
      {configStore.features.otherThirdPartyWidget && <div>Other Third Party Widget</div>}
    </div>
  );
});

export default Classes;
