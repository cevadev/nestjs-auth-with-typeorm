import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

//nombre que le queremos poner al decorator
//cuando marcamos al endpoint como isPublic, le pasomos elvalor true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
