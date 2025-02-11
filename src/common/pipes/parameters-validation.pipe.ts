import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParametersValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value)
      throw new BadRequestException(
        `O valor do parâmetro ${metadata.data} deve ser informado`,
      );
    else if (value.length !== 24)
      throw new BadRequestException('Invalid id length.');
    return value;
  }
}
