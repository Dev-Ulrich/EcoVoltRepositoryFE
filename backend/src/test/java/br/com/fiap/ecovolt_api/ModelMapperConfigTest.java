package br.com.fiap.ecovolt_api;
import br.com.fiap.ecovolt_api.config.ModelMapperConfig;
import br.com.fiap.ecovolt_api.dto.CadastroContaEnergiaDto;
import br.com.fiap.ecovolt_api.dto.AtualizacaoContaEnergiaDto;
import br.com.fiap.ecovolt_api.dto.DetalhesContaEnergiaDto;
import br.com.fiap.ecovolt_api.model.ContaEnergia;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
class ModelMapperConfigTest {
 @Test void foreignKeysMustNotBecomeEntityId() {
  var mapper=new ModelMapperConfig().modelMapper();
  var dto=new CadastroContaEnergiaDto();dto.setIdUsuario(7L);dto.setIdRecompensa(9L);dto.setNomeTitular("Teste");dto.setValorConta(12.5);
  var entity=mapper.map(dto,ContaEnergia.class);
  assertNull(entity.getId());assertEquals("Teste",entity.getNomeTitular());assertEquals(12.5,entity.getValorConta());
  var update=new AtualizacaoContaEnergiaDto();update.setIdUsuario(7L);update.setIdRecompensa(9L);
  assertNull(mapper.map(update,ContaEnergia.class).getId());
  entity.setId(11L);assertEquals(11L,mapper.map(entity,DetalhesContaEnergiaDto.class).getId());
 }
}
