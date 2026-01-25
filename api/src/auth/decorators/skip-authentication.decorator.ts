import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTHENTICATION = 'skipAuthentication';
export const SkipAuthentication = () => SetMetadata(SKIP_AUTHENTICATION, true);
