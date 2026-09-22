package br.com.fiap.epay.controller;

import br.com.fiap.epay.dto.SimulacaoInvestimentoDto;
import br.com.fiap.epay.service.InvestimentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/investimentos")
@Tag(name = "5. Investimentos & Cripto", description = "Endpoints para simulações financeiras e projeções de rendimento")
public class InvestimentoController {

    private final InvestimentoService investimentoService;

    public InvestimentoController(InvestimentoService investimentoService) {
        this.investimentoService = investimentoService;
    }

    @GetMapping("/simulacao")
    @Operation(summary = "Simular projeção de rendimento", description = "Calcula a rentabilidade comparativa entre Poupança, CDI 100% e Criptomoedas com base no valor inicial e prazo em meses.")
    public ResponseEntity<SimulacaoInvestimentoDto> simular(
            @RequestParam(defaultValue = "1000.00") BigDecimal valor,
            @RequestParam(defaultValue = "12") int meses) {

        SimulacaoInvestimentoDto resultado = investimentoService.simular(valor, meses);
        return ResponseEntity.ok(resultado);
    }
}
