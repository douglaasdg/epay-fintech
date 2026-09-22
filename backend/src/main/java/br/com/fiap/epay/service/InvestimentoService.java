package br.com.fiap.epay.service;

import br.com.fiap.epay.dto.SimulacaoInvestimentoDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class InvestimentoService {

    public SimulacaoInvestimentoDto simular(BigDecimal valorInicial, int meses) {
        if (valorInicial == null || valorInicial.compareTo(BigDecimal.ZERO) <= 0) {
            valorInicial = new BigDecimal("1000.00");
        }
        if (meses <= 0) {
            meses = 12;
        }

        // Taxas mensais de referência:
        // Poupança: 0.5% a.m. (taxa 0.005)
        // CDI (100% CDI): ~0.85% a.m. (taxa 0.0085)
        // Cripto / Cesta de Ativos Tech: ~1.8% a.m. (taxa 0.018)
        double capital = valorInicial.doubleValue();

        double montantePoupanca = capital * Math.pow(1 + 0.005, meses);
        double montanteCdi = capital * Math.pow(1 + 0.0085, meses);
        double montanteCripto = capital * Math.pow(1 + 0.018, meses);

        BigDecimal rendPoupanca = BigDecimal.valueOf(montantePoupanca).setScale(2, RoundingMode.HALF_EVEN);
        BigDecimal rendCdi = BigDecimal.valueOf(montanteCdi).setScale(2, RoundingMode.HALF_EVEN);
        BigDecimal rendCripto = BigDecimal.valueOf(montanteCripto).setScale(2, RoundingMode.HALF_EVEN);

        return new SimulacaoInvestimentoDto(valorInicial, meses, rendPoupanca, rendCdi, rendCripto);
    }
}
