import { EventClass } from '@evento/rabbitmq-utils';
import { GoingsOnEventsTypesEnum } from '../../constants/goings-on-events-types.enum';
import { IGoingsOnEventEventCreatedPayload } from '../payloads/goings-on-event-event-created.payload';

export class GoingsOnEventEventCreatedMessage extends EventClass<IGoingsOnEventEventCreatedPayload> {
  static type = GoingsOnEventsTypesEnum.EVENT_CREATED;
  static version = '1.0.0';

  constructor(
    context: { ms: string },
    payload: IGoingsOnEventEventCreatedPayload
  ) {
    super(
      GoingsOnEventEventCreatedMessage.type,
      GoingsOnEventEventCreatedMessage.version,
      context,
      payload
    );
  }
}
