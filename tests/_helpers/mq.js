
import MQ from '../../ultimate';
import bp from './breakpoints';
import { using_ems } from './mq_style';

const mq = using_ems ? new MQ(bp, { ems: true }) : new MQ(bp);

export default mq;
