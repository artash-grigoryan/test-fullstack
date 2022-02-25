import { IGoingsOnCommandCreateEventPayload } from '../payloads/goings-on-command-create-event.payload';
import { CommandClass } from '@evento/rabbitmq-utils';
import { GoingsOnCommandsTypesEnum } from '../../constants/goings-on-commands-types.enum';

export class GoingsOnCommandCreateEventMessage extends CommandClass<IGoingsOnCommandCreateEventPayload> {
  static type = GoingsOnCommandsTypesEnum.CREATE_EVENT;
  static version = '1.0.0';

  constructor(payload: IGoingsOnCommandCreateEventPayload) {
    super(
      GoingsOnCommandCreateEventMessage.type,
      GoingsOnCommandCreateEventMessage.version,
      payload
    );
  }
}
