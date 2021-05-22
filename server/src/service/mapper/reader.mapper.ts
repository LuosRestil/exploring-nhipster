import { Reader } from '../../domain/reader.entity';
import { ReaderDTO } from '../dto/reader.dto';

/**
 * A Reader mapper object.
 */
export class ReaderMapper {
    static fromDTOtoEntity(entityDTO: ReaderDTO): Reader {
        if (!entityDTO) {
            return;
        }
        const entity = new Reader();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Reader): ReaderDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ReaderDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
